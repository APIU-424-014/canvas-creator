function CanvasMethod(name, args, desc, ref) {
	this.name = name;
	this.args = args;
	this.desc = desc;
	this.ref = ref;
}
CanvasMethod.prototype.asCommand = function(valueList) {
	// returns name(valueList[0], valueList[1] ...) as a string containing the
	// values
	var ret = this.name;
	ret += this.asParameters(valueList);
	return ret;
};
CanvasMethod.prototype.asParameters = function(valueList) {
	// return (valueList[0], valueList[1] ...) as a string containing the values
	var ret = "(";
	for (var i = 0; i < this.args.length; i++) {
		ret += this.args[i].asArgument(valueList[i]);
		if (i < this.args.length - 1)
			ret += ", ";
	}
	return ret + ")";
};