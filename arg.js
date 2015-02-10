function Arg(name, type, desc, group, required, options) {
	this.name = name;
	this.type = type; // like Arg.byte or Arg.xcoord
	this.desc = desc; // description
	this.group = group; // groups arguments together to be used as a point(x,y)
	this.required = required;// 0=always, 1=all of 1 and below, and so on
	this.options = options;
}
Arg.prototype.isValid = function(value) {
	if (this.type === Arg.type.byte) {
		return (value % 256) === value;
	} else if (this.type === Arg.type.number || this.type === Arg.type.rad
			|| this.type === Arg.type.xcoord || this.type === Arg.type.ycoord
			|| this.type === Arg.type.xoffset || this.type === Arg.type.yoffset) {
		return (typeof value) === "number"
				|| /^[\s]*[0-9]+[\.]?[0-9]*[\s]*$/.exec(value) !== null;
	} else if (this.type === Arg.type.oneToZero) {
		return (typeof value) === "number" && value >= 0 && value <= 1;
	} else if (this.type === Arg.type.text) {
		return (typeof value) === "string";
	} else if (this.type === Arg.type.bool) {
		return (typeof value) === "boolean" || value === 0 || value === 1
				|| value;
	} else if (this.type === Arg.type.choice) {
		if (!this.options)
			return false;
		for (var i = 0; i < this.options.length; i++) {
			if (this.options[i] === value)
				return true;
		}
		return false;
	}
	return false;
};
Arg.prototype.asArgument = function(value) {
	if (this.type === Arg.type.bool) {
		if (this.asValue(value))
			return "true";
		else
			return "false";
	}
	if (this.type === Arg.type.text) {
		return "\"" + value + "\"";
	}
	return value;
};
Arg.prototype.asValue = function(value) {
	if (this.type === Arg.type.text || this.type === Arg.type.choice) {
		return "" + value;
	} else if (this.type === Arg.type.bool) {
		// every thing is false except true and "true" (case insensitive) and 1
		return value === true
				|| (typeof value === "string" && value.toLowerCase() === "true")
				|| value === 1;
	} else {
		return +value;// number
	}
};
Arg.type = {};
Arg.type.byte = 0;
Arg.type.number = 1;
Arg.type.bool = 2;
Arg.type.oneToZero = 3;
Arg.type.text = 4;
Arg.type.rad = 5;
Arg.type.xcoord = 6; // coords are grouped together
Arg.type.ycoord = 7;
Arg.type.xoffset = 8; // offsets use the same group as the coords they relate
// to
Arg.type.yoffset = 9;
Arg.type.image = 4; // dirty hack: treating image as text (image would be of
// type CanvasImageSource according to
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource
Arg.type.choice = 11;