function PathCollector() {
	this.path = new Path();
	PathCollector.instances++;
	this.id = "PathCollector" + PathCollector.instances;
	this.inputs = {};
	for (var i = 0; i < Path.modes.length; i++) {
		this.inputs[Path.modes[i].name] = new ModeInputCollector(Path.modes[i]);
		this.inputs[Path.modes[i].name].completedEvent.register(this,
				this.drawDummy);
		this.inputs[Path.modes[i].name].userAcceptedEvent.register(this,
				this.add);
	}
}
PathCollector.prototype.getElement = function() {
	var element = document.getElementById(this.id);
	if (element)
		return element;
	var fieldset = document.createElement("fieldset");
	fieldset.id = this.id;
	var legend = document.createElement("legend");
	legend.innerHTML = "Path modes";
	fieldset.appendChild(legend);
	for ( var key in Path.modes) {
		var mode = Path.modes[key];
		var label = document.createElement("label");
		label.innerHTML = mode.name;
		var input = document.createElement("input");
		input.type = "radio";
		input.name = this.id;
		input.value = mode.name;
		input.id = this.id + mode.name;
		var that = this;
		input.onchange = function(e) {
			PathCollector.valueChanged.call(this, e, that);
		};
		input.mode = mode;
		input.PathCollector = this;
		label.appendChild(input);// putting an input into a label has the
		// same effect as using "for", the "for" attribute of a label can't
		// be
		// set using JS.
		fieldset.appendChild(label);
	}
	return fieldset;
};

PathCollector.prototype.showAttributeBox = function(mode, parent) {
	if (parent.firstChild) {
		parent.firstChild.style.visibility = "hidden";
		document.body.appendChild(parent.firstChild);
	}
	var element = this.inputs[mode.name].getElement();
	element.style.visibility = "visible";
	parent.appendChild(element);
};

PathCollector.prototype.add = function(sender, mode) {
	if (sender.isComplete()) {
		this.path.add(mode, sender.getValueList());
	}
};
PathCollector.instances = 0;

PathCollector.valueChanged = function(e, target) {
	console.log(target);
	// this in context of html element event
	target.showAttributeBox(this.mode, document
			.getElementById("sub_attributes"));
};
PathCollector.prototype.drawDummy = function(sender, valueList) {
	console.log(valueList);
	var canvas = document.getElementById("draw");
	var context = canvas.getContext("2d");
	context.beginPath();
	context[sender.mode.name].apply(context, valueList);
	context.stroke();
	context.fill();
};