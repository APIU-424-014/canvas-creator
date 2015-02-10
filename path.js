function Path() {
	this.modes = []; // list modes composed of modes from Path.modes
	this.valueLists = []; // list of valueList belonging to the this.mode at
	// same index
	this.changedEvent = new Event(this);// (sender) emitted on add
}

Path.prototype.add = function(mode, valueList) {
	var i = 0;
	for (; i < valueList.length; i++) {
		if (!mode.args[i].isValid(valueList[i]))
			return false;
	}
	if (i == valueList.length) {
		this.modes.push(mode);
		this.valueLists.push(valueList);
		this.changedEvent.emit();
		return true;
	}
	return false;
};
Path.prototype.draw = function(context) {
	for (var i = 0; i < this.modes.length; i++) {
		context[this.modes[i].name].apply(context, this.valueLists[i]);
	}
};
Path.prototype.toCode = function(nameOfContext) {
	// composes one method name and its arguments per line to be called on an
	// object of nameOfContext
	var ret = "";
	for (var i = 0; i < this.modes.length; i++) {
		ret += nameOfContext + "."
				+ this.modes[i].asCommand(this.valueLists[i]) + ";\r\n";
	}
	return ret;
};
