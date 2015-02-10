function InputCollectorSelector(methods, name, collectorPlaceId) {
	this.name = name;
	this.collectorPlaceId = collectorPlaceId;
	InputCollectorSelector.instances++;
	this.id = "InputCollectorSelector" + InputCollectorSelector.instances;
	this.inputs = {};
	this.selectedCollectorChanged = new Event(this); // (sender,methodInputCollector)
	this.methodParameterChangedEvent = new Event(this);// (sender,methodInputCollector,index,value)
	this.methodParameterCompletedEvent = new Event(this);// (sender,methodInputCollector,valueList)
	this.userAcceptedEvent = new Event(this);// (sender,methodInputCollector,method,valueList);
	console.log("!!!!!!!!!!", methods);
	for ( var key in methods) {
		this.inputs[methods[key].name] = new MethodInputCollector(methods[key]);
		/* make these event accessible from this class */
		this.inputs[methods[key].name].parameterChangedEvent.register(this,
				this._parameterChanged);
		this.inputs[methods[key].name].parameterCompletedEvent.register(this,
				this._parameterCompleted);
		this.inputs[methods[key].name].userAcceptedEvent.register(this,
				this._userAccepted);
	}
}
InputCollectorSelector.prototype._parameterChanged = function(sender, index,
		value) {
	this.methodParameterChangedEvent.emit(sender, index, value);
};
InputCollectorSelector.prototype._parameterCompleted = function(sender,
		valueList) {
	this.methodParameterCompletedEvent.emit(sender, valueList);
};
InputCollectorSelector.prototype._userAccepted = function(sender, method,
		valueList) {
	this.userAcceptedEvent.emit(sender, method, valueList);
};
InputCollectorSelector.prototype.showIn = function(id) {
	console.log(id);
	var place = document.getElementById(id);
	if (place.firstChild) {
		// moving other element out of the box
		place.firstChild.style.visibility = "hidden";
		document.body.appendChild(place.firstChild);
	}

	// moving the Path.modes selector box to its place
	var element = this.getElement();
	element.style.visibility = "visible";
	place.appendChild(element);
};

InputCollectorSelector.prototype.getElement = function() {
	var element = document.getElementById(this.id);
	if (element)
		return element;
	var fieldset = document.createElement("fieldset");
	fieldset.id = this.id; // required to reuse generated html elements
	var legend = document.createElement("legend");
	legend.innerHTML = this.name;
	fieldset.appendChild(legend);
	for ( var key in this.inputs) {
		var method = this.inputs[key].method;
		var label = document.createElement("label");
		label.innerHTML = method.name;
		var input = document.createElement("input");
		input.type = "radio";
		input.name = this.id;
		input.value = key;
		input.id = this.id + method.name;
		var that = this;
		input.onchange = function(e) {
			InputCollectorSelector.selectionChangedRedirector.call(this, e,
					that);
		};
		input.InputCollectorSelector = this;
		label.appendChild(input);// putting an input into a label has the
		// same effect as using "for", the "for" attribute of a label can't
		// be set using JS.
		fieldset.appendChild(label);
	}
	return fieldset;
};

InputCollectorSelector.prototype.add = function(sender, mode) {
	if (sender.isComplete()) {
		this.path.add(mode, sender.getValueList());
	}
};
InputCollectorSelector.instances = 0;

InputCollectorSelector.selectionChangedRedirector = function(e, target) {
	// this in context of html element event
	var parent = document.getElementById(target.collectorPlaceId);
	if (parent.firstChild) {
		parent.firstChild.style.visibility = "hidden";
		// TODO: use display:none, as hidden elements take up space
		document.body.appendChild(parent.firstChild);
	}
	var element = target.inputs[this.value].getElement();
	element.style.visibility = "visible";
	parent.appendChild(element);
	target.selectedCollectorChanged.emit(target.inputs[this.value]);

};