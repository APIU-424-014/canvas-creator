function ModeInputCollector(mode) {
	ModeInputCollector.instances++;
	this.id = "ModeInputCollector" + ModeInputCollector.instances;
	this.mode=mode;
	this.inputs = [];
	this.valueChangedEvent = new Event(this);// (sender,index,value)
	this.completedEvent = new Event(this);// (sender,valueList)
	this.userAcceptedEvent = new Event(this);// (sender,mode)
}
ModeInputCollector.prototype.getElement = function() {
	var element = document.getElementById(this.id);
	if (element) {
		return element;
	}
	var fieldset = document.createElement("fieldset");
	fieldset.id = this.id;
	var legend = document.createElement("legend");
	legend.innerHTML = this.mode.name;
	fieldset.appendChild(legend);
	var that=this;
	for (var i = 0; i < this.mode.args.length; i++) {
		var input = document.createElement("input");
		input.index = i;
		input.creator = this;
		input.type = "text";
		input.name = this.mode.args[i].name;
		input.title = this.mode.args[i].desc;
		if (this.mode.args[i].group || this.mode.args[i].group === 0) {
			input["class"] = this.mode.args[i].group + "" + this.mode.name;
		}
		input.id = this.id + this.mode.name + "_" + this.mode.args[i].name;
		var label = document.createElement("label");
		label.innerHTML = this.mode.args[i].name;
		// label["for"] = this.name + "_" + this.args[i].name;
		input.onchange = function(e){ModeInputCollector.onchangeRedirector.call(this,e,that);};
		this.inputs.push(input);
		label.appendChild(input);
		fieldset.appendChild(label);
	}
	var input = document.createElement("input");
	input.type = "button";
	input.value = "OK";
	input.creator = this;
	input.onclick = function(e){ModeInputCollector.onacceptRedirector.call(this,e,that);};
	fieldset.appendChild(input);
	return fieldset;
};
ModeInputCollector.prototype.isComplete = function() {
	for (var i = 0; i < this.inputs.length; i++) {
		if (!this.mode.args[i].isValid(this.inputs[i].value)) {
			return false;
		}
	}
	return true;
};
ModeInputCollector.prototype.getValueList = function() {
	var ret = [];
	for (var i = 0; i < this.inputs.length; i++) {
		ret.push(this.mode.args[i].asValue(this.inputs[i].value));
	}
	return ret;
};
ModeInputCollector.instances = 0;
ModeInputCollector.onchangeRedirector = function(e,target) {
	if (target.mode.args[this.index].isValid(this.value)) {
		target.valueChangedEvent.emit(this.index, this.value);
		if (target.isComplete()) {
			target.completedEvent.emit(target.getValueList());
		}
	}
};
ModeInputCollector.onacceptRedirector = function(e,target) {
	console.log(this);
	target.userAcceptedEvent.emit(target.mode);
};
