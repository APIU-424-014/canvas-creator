function CanvasStyleApplierMethod(name, args, desc, ref) {
	CanvasMethod.apply(this, arguments);
}
CanvasStyleApplierMethod.prototype = new CanvasMethod();

/*
 * CanvasRenderingContext2D.fill() CanvasRenderingContext2D.stroke()
 */

CanvasStyleApplierMethod.methods = {};
CanvasStyleApplierMethod.methods.fill = new CanvasStyleApplierMethod(
		"fill",
		[ new Arg(
				"fillRule",
				Arg.type.choice,
				"method to distinguish inside from outside (for self crossing paths)",
				0, 1, [ "nonzero", "evenodd" ])
		/*
		 * There is a path parameter as first argument of two mentioned, it's of
		 * type Path2D which looks not to be well supported
		 */
		], "limits the drawing area to the current path",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.fill");
CanvasStyleApplierMethod.methods.clip = new CanvasStyleApplierMethod(
		"clip",
		[ new Arg(
				"fillRule",
				Arg.type.choice,
				"method to distinguish inside from outside (for self crossing paths)",
				0, 1, [ "nonzero", "evenodd" ])
		/*
		 * There is a path parameter as first argument of two mentioned, it's of
		 * type Path2D which looks not to be well supported
		 */
		], "limits the drawing area to the current path",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.clip");
CanvasStyleApplierMethod.methods.stroke = new CanvasStyleApplierMethod(
		"stroke", [
		/*
		 * There is a path parameter as argument mentioned, it's of type Path2D
		 * which looks not to be well supported
		 */
		], "limits the drawing area to the current path",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.stroke");