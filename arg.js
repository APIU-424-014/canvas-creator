function Arg(name, type, desc, group) {
	this.name = name;
	this.type = type; // like Arg.byte or Arg.xcoord
	this.desc = desc; // description
	this.group = group; // groups arguments together to be used as a point(x,y)
	// for example
}
Arg.prototype.isValid = function(value) {
	if (this.type === Arg.byte) {
		return (value % 256) === value;
	} else if (this.type === Arg.number || this.type === Arg.rad
			|| this.type === Arg.xcoord || this.type == Arg.ycoord) {
		return (typeof value) === "number";
	} else if (this.type === Arg.oneToZero) {
		return (typeof value) === "number" && value >= 0 && value <= 1;
	} else if (this.type === Arg.text) {
		return (typeof value) === "string";
	} else if (this.type === Arg.bool) {
		return (typeof value) === "boolean" || value === 0 || value === 1
				|| value;
	} else
		return false;
};
Arg.prototype.asArgument = function(value) {
	if (this.type === Arg.bool) {
		if (this.asValue(value))
			return "true";
		else
			return "false";
	}
	if (this.type === Arg.text) {
		return "\"" + value + "\"";
	}
	return value;
};
Arg.prototype.asValue = function(value) {
	if (this.type === Arg.text) {
		return "" + value;
	} else if (this.type === Arg.bool) {
		// every thing is false except true and "true" (case insensitive) and 1
		return value === true
				|| (typeof value === "string" && value.toLowerCase() === "true")
				|| value === 1;
	} else {
		return +value;// number
	}
};

Arg.byte = 0;
Arg.number = 1;
Arg.bool = 2;
Arg.oneToZero = 3;
Arg.text = 4;
Arg.rad = 5;
Arg.xcoord = 6;
Arg.ycoord = 7;