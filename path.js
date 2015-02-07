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

// static values
Path.moveTo = new Mode("moveTo", [
		new Arg("x", Arg.xcoord, "X coordinate of new start point", 0),
		new Arg("y", Arg.ycoord, "Y coordinate of new start point", 0) ],
		"Moves to a new start point",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.moveTo");
Path.lineTo = new Mode("lineTo", [
		new Arg("ex", Arg.xcoord, "X coordinate of endpoint", 0),
		new Arg("ey", Arg.ycoord, "Y coordinate of endpoint", 0) ],
		"A line towards an end point",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineTo");
Path.arc = new Mode("arc", [
		new Arg("x", Arg.xcoord, "X coordinate of center", 0),
		new Arg("y", Arg.ycoord, "Y coordinate of center", 0),
		new Arg("radius", Arg.number, "Radius"),
		new Arg("startAngle", Arg.rad, "Starting angle in radians"),
		new Arg("endAngle", Arg.rad, "Ending angle in radians"),
		new Arg("counterClockwise", Arg.bool, "Counter clockwise") ],
		"An arc between two angles and with given radius",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arc");
Path.arcTo = new Mode("arcTo", [
		new Arg("x1", Arg.xcoord, "X coordinate of first point", 0),
		new Arg("y1", Arg.ycoord, "Y coordinate of first point", 0),
		new Arg("x2", Arg.xcoord, "X coordinate of second point", 1),
		new Arg("y2", Arg.ycoord, "Y coordinate of second point", 1),
		new Arg("radius", Arg.rad, "Radius") ],
		"An arc between between two points with given radius",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arcTo");
Path.bezierCurveTo = new Mode(
		"bezierCurveTo",
		[
				new Arg("cx1", Arg.xcoord,
						"X coordinate of first control point", 0),
				new Arg("cy1", Arg.ycoord,
						"Y coordinate of first control point", 0),
				new Arg("cx2", Arg.xcoord,
						"X coordinate of second control point", 1),
				new Arg("cy2", Arg.ycoord,
						"Y coordinate of second control point", 1),
				new Arg("ex3", Arg.xcoord, "X coordinate of end point", 2),
				new Arg("ey3", Arg.ycoord, "Y coordinate of end point", 2) ],
		"A Bezier curve twowards an end point using two control points",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.bezierCurveTo");
Path.quadraticCurveTo = new Mode(
		"quadraticCurveTo",
		[
				new Arg("cx", Arg.xcoord, "X coordinate of the control point",
						0),
				new Arg("cy", Arg.ycoord, "Y coordinate of the control point",
						0),
				new Arg("x", Arg.xcoord, "X coordinate of the end point", 1),
				new Arg("y", Arg.ycoord, "Y coordinate of the end point", 1) ],
		"A quadratic curve towards end point using a control point (peak is between theoretic x axis and control point)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.quadraticCurveTo");
Path.fillRect = new Mode("fillRect", [
		new Arg("x", Arg.xcoord, "X coordinate of the position", 0),
		new Arg("y", Arg.ycoord, "Y coordinate of the position", 0),
		new Arg("w", Arg.xoffset, "Width of the rectangle", 0),
		new Arg("h", Arg.xoffset, "Height of the rectangle", 0) ], "A rectangle without borders (not moving the cursor)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillRect");
Path.rect = new Mode("rect", [
		new Arg("x", Arg.xcoord, "X coordinate of the position", 0),
		new Arg("y", Arg.ycoord, "Y coordinate of the position", 0),
		new Arg("w", Arg.xoffset, "Width of the rectangle", 0),
		new Arg("h", Arg.yoffset, "Height of the rectangle", 0) ], "A rectangle with borders (moving the the cursor to x/y",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillRect");

Path.modes = [ Path.moveTo, Path.lineTo, Path.arc, Path.arcTo,
		Path.bezierCurveTo, Path.quadraticCurveTo, Path.fillRect, Path.rect];
