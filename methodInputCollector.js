function MethodInputCollector(method) {
	MethodInputCollector.instances++;
	this.id = "MethodInputCollector" + MethodInputCollector.instances;
	this.method = method;
	this.inputs = [];
	this.parameterChangedEvent = new Event(this);// (sender,index,value)
	this.parameterCompletedEvent = new Event(this);// (sender,valueList)
	this.userAcceptedEvent = new Event(this);// (sender,method,valueList)
}
MethodInputCollector.prototype.getElement = function() {
	var element = document.getElementById(this.id);
	if (element) {
		return element;
	}
	var fieldset = document.createElement("fieldset");
	fieldset.id = this.id;
	var legend = document.createElement("legend");
	legend.innerHTML = this.method.name;
	fieldset.appendChild(legend);
	for (var i = 0; i < this.method.args.length; i++) {
		var input = document.createElement("input");
		input.index = i;
		input.creator = this;
		input.type = "text";
		input.name = this.method.args[i].name;
		input.title = this.method.args[i].desc;
		if (this.method.args[i].group || this.method.args[i].group === 0) {
			input["class"] = this.method.args[i].group + "" + this.method.name;
		}
		input.id = this.id + this.method.name + "_" + this.method.args[i].name;
		var label = document.createElement("label");
		label.innerHTML = this.method.args[i].name;
		// label["for"] = this.name + "_" + this.args[i].name;

		var that = this;
		input.onchange = function(e) {
			MethodInputCollector.onchangeRedirector.call(this, e, that);
		};
		this.inputs.push(input);
		label.appendChild(input);
		fieldset.appendChild(label);
	}
	var input = document.createElement("input");
	input.type = "button";
	input.value = "OK";
	input.creator = this;
	var that = this;
	input.onclick = function(e) {
		MethodInputCollector.onacceptRedirector.call(this, e, that);
	};
	fieldset.appendChild(input);
	return fieldset;
};
MethodInputCollector.prototype.isComplete = function() {
	for (var i = 0; i < this.inputs.length; i++) {
		if (!this.method.args[i].isValid(this.inputs[i].value)) {
			return false;
		}
	}
	return true;
};
MethodInputCollector.prototype.getValueList = function() {
	var ret = [];
	for (var i = 0; i < this.inputs.length; i++) {
		ret.push(this.method.args[i].asValue(this.inputs[i].value));
	}
	return ret;
};
MethodInputCollector.instances = 0;
MethodInputCollector.onchangeRedirector = function(e, target) {
	if (target.method.args[this.index].isValid(this.value)) {
		target.parameterChangedEvent.emit(this.index, this.value);
		if (target.isComplete()) {
			target.parameterCompletedEvent.emit(target.getValueList());
		}
	}
};
MethodInputCollector.onacceptRedirector = function(e, target) {
	target.userAcceptedEvent.emit(target.method, target.getValueList());
};
