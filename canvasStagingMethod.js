function CanvasStagingMethod(name, args, desc, ref) {
	CanvasMethod.apply(this, arguments);
}
CanvasStagingMethod.prototype = new CanvasMethod();
/*
 * CanvasRenderingContext2D.beginPath() CanvasRenderingContext2D.clip()
 * CanvasRenderingContext2D.closePath() CanvasRenderingContext2D.restore()
 * CanvasRenderingContext2D.save()
 */
CanvasStagingMethod.methods = {};
CanvasStagingMethod.methods.beginPath = new CanvasStagingMethod("beginPath",
		[], "starts a new path",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.beginPath");
CanvasStagingMethod.methods.closePath = new CanvasStagingMethod("closePath",
		[], "closes the path  (if necessary)",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.closePath");
CanvasStagingMethod.methods.restore = new CanvasStagingMethod("restore", [],
		"restores a saved state from the stack",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.restore");
CanvasStagingMethod.methods.save = new CanvasStagingMethod("save", [],
		"pushes the current state to the stack",
		"developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.save");