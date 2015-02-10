function CanvasTransformationMethod(name, args, desc, ref) {
	CanvasMethod.apply(this, arguments);
}
CanvasTransformationMethod.prototype = new CanvasMethod();

/*
 * CanvasRenderingContext2D.rotate() CanvasRenderingContext2D.scale()
 * CanvasRenderingContext2D.setTransform() CanvasRenderingContext2D.transform()
 * CanvasRenderingContext2D.translate()
 */
CanvasTransformationMethod.methods = {};
CanvasTransformationMethod.methods.rotate = new CanvasTransformationMethod(
		"rotate", [ new Arg("angle", Arg.type.rad, "angle in radians around 0/0 (no affects to already drawn stuff)") ],
		"rotates in clockwise direction",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.rotate");
CanvasTransformationMethod.methods.scale = new CanvasTransformationMethod(
		"scale", [ new Arg("x", Arg.type.number, "horizontal units per pixel"),
				new Arg("y", Arg.type.number, "vertical units per pixel") ],
		"scales the canvas",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.scale");
CanvasTransformationMethod.methods.translate = new CanvasTransformationMethod(
		"translate", [ new Arg("x", Arg.type.xoffset, "horizontal offset", 0),
				new Arg("y", Arg.type.yoffset, "vertical offset", 0) ],
		"translate by a given offset",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.translate");
CanvasTransformationMethod.methods.setTransform = new CanvasTransformationMethod(
		"setTransform",
		[
				new Arg("m11", Arg.type.number,
						"m11 of transformation matrix (horizontal scaling)"),
				new Arg("m12", Arg.type.number,
						"m12 of transformation matrix (horizontal skewing)"),
				new Arg("m21", Arg.type.number,
						"m21 of transformation matrix (vertical scaling)"),
				new Arg("m22", Arg.type.number,
						"m22 of transformation matrix (vertical skewing)"),
				new Arg("m31", Arg.type.number,
						"m31 of transformation matrix (horizontal moving)"),
				new Arg("m32", Arg.type.number,
						"m32 of transformation matrix (vertical moving)"), ],
		"applies a transformation matrix (this overwrites rotate, translate and scale)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.setTransform");
CanvasTransformationMethod.methods.transform = new CanvasTransformationMethod(
		"transform",
		[
				new Arg("m11", Arg.type.number,
						"m11 of transformation matrix (horizontal scaling)"),
				new Arg("m12", Arg.type.number,
						"m12 of transformation matrix (horizontal skewing)"),
				new Arg("m21", Arg.type.number,
						"m21 of transformation matrix (vertical scaling)"),
				new Arg("m22", Arg.type.number,
						"m22 of transformation matrix (vertical skewing)"),
				new Arg("m31", Arg.type.number,
						"m31 of transformation matrix (horizontal moving)"),
				new Arg("m32", Arg.type.number,
						"m32 of transformation matrix (vertical moving)"), ],
		"applies a transformation matrix (this multiplies the current rotate, translate and scale matrix)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.transform");