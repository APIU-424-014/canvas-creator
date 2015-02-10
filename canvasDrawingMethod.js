function CanvasDrawingMethod(name, args, desc, ref) {
	CanvasMethod.apply(this, arguments);
}
CanvasDrawingMethod.prototype = new CanvasMethod();

CanvasDrawingMethod.methods = {};
CanvasDrawingMethod.methods.moveTo = new CanvasDrawingMethod("moveTo", [
		new Arg("x", Arg.type.xcoord, "X coordinate of new start point", 0),
		new Arg("y", Arg.type.ycoord, "Y coordinate of new start point", 0) ],
		"Moves to a new start point",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.moveTo");
CanvasDrawingMethod.methods.lineTo = new CanvasDrawingMethod("lineTo", [
		new Arg("ex", Arg.type.xcoord, "X coordinate of endpoint", 0),
		new Arg("ey", Arg.type.ycoord, "Y coordinate of endpoint", 0) ],
		"A line towards an end point",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineTo");
CanvasDrawingMethod.methods.arc = new CanvasDrawingMethod("arc", [
		new Arg("x", Arg.type.xcoord, "X coordinate of center", 0),
		new Arg("y", Arg.type.ycoord, "Y coordinate of center", 0),
		new Arg("radius", Arg.type.number, "Radius"),
		new Arg("startAngle", Arg.type.rad, "Starting angle in radians"),
		new Arg("endAngle", Arg.type.rad, "Ending angle in radians"),
		new Arg("counterClockwise", Arg.type.bool, "Counter clockwise") ],
		"An arc between two angles and with given radius",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arc");
CanvasDrawingMethod.methods.arcTo = new CanvasDrawingMethod("arcTo", [
		new Arg("x1", Arg.type.xcoord, "X coordinate of first point", 0),
		new Arg("y1", Arg.type.ycoord, "Y coordinate of first point", 0),
		new Arg("x2", Arg.type.xcoord, "X coordinate of second point", 1),
		new Arg("y2", Arg.type.ycoord, "Y coordinate of second point", 1),
		new Arg("radius", Arg.type.rad, "Radius") ],
		"An arc between between two points with given radius",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arcTo");
CanvasDrawingMethod.methods.bezierCurveTo = new CanvasDrawingMethod(
		"bezierCurveTo",
		[
				new Arg("cx1", Arg.type.xcoord,
						"X coordinate of first control point", 0),
				new Arg("cy1", Arg.type.ycoord,
						"Y coordinate of first control point", 0),
				new Arg("cx2", Arg.type.xcoord,
						"X coordinate of second control point", 1),
				new Arg("cy2", Arg.type.ycoord,
						"Y coordinate of second control point", 1),
				new Arg("ex3", Arg.type.xcoord, "X coordinate of end point", 2),
				new Arg("ey3", Arg.type.ycoord, "Y coordinate of end point", 2) ],
		"A Bezier curve twowards an end point using two control points",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.bezierCurveTo");
CanvasDrawingMethod.methods.quadraticCurveTo = new CanvasDrawingMethod(
		"quadraticCurveTo",
		[
				new Arg("cx", Arg.type.xcoord,
						"X coordinate of the control point", 0),
				new Arg("cy", Arg.type.ycoord,
						"Y coordinate of the control point", 0),
				new Arg("x", Arg.type.xcoord, "X coordinate of the end point",
						1),
				new Arg("y", Arg.type.ycoord, "Y coordinate of the end point",
						1) ],
		"A quadratic curve towards end point using a control point (peak is between theoretic x axis and control point)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.quadraticCurveTo");
CanvasDrawingMethod.methods.fillRect = new CanvasDrawingMethod("fillRect", [
		new Arg("x", Arg.type.xcoord, "X coordinate of the position", 0),
		new Arg("y", Arg.type.ycoord, "Y coordinate of the position", 0),
		new Arg("w", Arg.type.xoffset, "Width of the rectangle", 0),
		new Arg("h", Arg.type.xoffset, "Height of the rectangle", 0) ],
		"A rectangle without borders (not moving the cursor)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillRect");
CanvasDrawingMethod.methods.rect = new CanvasDrawingMethod("rect", [
		new Arg("x", Arg.type.xcoord, "X coordinate of the position", 0),
		new Arg("y", Arg.type.ycoord, "Y coordinate of the position", 0),
		new Arg("w", Arg.type.xoffset, "Width of the rectangle", 0),
		new Arg("h", Arg.type.yoffset, "Height of the rectangle", 0) ],
		"A rectangle with borders (moving the the cursor to x/y)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillRect");
CanvasDrawingMethod.methods.drawImage = new CanvasDrawingMethod("drawImage", [
		new Arg("image", Arg.type.image, "A image element", 0, 0),
		new Arg("dx", Arg.type.xcoord, "Destination X coordinate", 1, 0),
		new Arg("dy", Arg.type.ycoord, "Destination Y coordinate", 1, 0),
		new Arg("dWidth", Arg.type.xoffset, "Destination width", 1, 1),
		new Arg("dHeight", Arg.type.yoffset, "Destination height", 1, 1),
		new Arg("sx", Arg.type.xcoord, "Source X coordinate", 2, 2),
		new Arg("sy", Arg.type.ycoord, "Source Y coordinate", 2, 2),
		new Arg("sWidth", Arg.type.xoffset, "Source width", 2, 2),
		new Arg("sHeight", Arg.type.yoffset, "Source height", 2, 2) ],
		"A image",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage");
CanvasDrawingMethod.methods.fillText = new CanvasDrawingMethod("fillText", [
		new Arg("text", Arg.type.text, "Some text", 0, 0),
		new Arg("x", Arg.type.xcoord, "X coordinate", 1, 0),
		new Arg("y", Arg.type.ycoord, "Y coordinate", 1, 0),
		new Arg("maxWidth", Arg.type.xoffset,
				"Maximum width (text will be resized)", 1, 0) ],
		"Fills a given text",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fillText");
CanvasDrawingMethod.methods.strokeRect = new CanvasDrawingMethod("strokeRect",
		[ new Arg("x", Arg.type.xcoord, "X coordinate", 0, 0),
				new Arg("y", Arg.type.ycoord, "Y coordinate", 0, 0),
				new Arg("width", Arg.type.xoffset, "width", 0, 0),
				new Arg("height", Arg.type.xofset, "height", 0, 0) ],
		"A border (only) of a rectangle",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.strokeRect");
CanvasDrawingMethod.methods.strokeText = new CanvasDrawingMethod("strokeText",
		[
				new Arg("text", Arg.type.text, "Some text", 0, 0),
				new Arg("x", Arg.type.xcoord, "X coordinate", 1, 0),
				new Arg("y", Arg.type.ycoord, "Y coordinate", 1, 0),
				new Arg("maxWidth", Arg.type.xoffset,
						"Maximum width (text will be resized)", 1, 0) ],
		"The borders (only) of a text",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.strokeText");
/*
 * CanvasRenderingContext2D.strokeText()
 */