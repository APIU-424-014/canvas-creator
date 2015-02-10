function init() {

	// draw stuff to see whether canvas does work
	var canvas = document.getElementById("draw");
	var context = canvas.getContext("2d");
	context.fillStyle = "rgba(128,128,128,0.5)";
	context.strokeStyle = "rgba(255,0,0,0.5)";
	context.lineWidth = 3;
	context.moveTo(70, 70);
	context.lineTo(100, 70);// here the path ends
	context.rect(150, 70, 50, 50);
	context.lineTo(125, 95); // this line is connected to the rectangle
	context.stroke();
	context.fill();

	context.beginPath();
	context.moveTo(70, 140);
	context.lineTo(100, 140);
	context.fillRect(150, 140, 50, 50);
	context.lineTo(125, 165); // this line isn't connect to the rectangle, but
	// to lineTo(100,140)
	context.stroke();
	context.fill();
	context.beginPath();
	context.fillStyle = "rgba(128,255,128,0.5)";

	context.fill();

	// collects clicks on canvas
	mouseInputProvider = new MouseInputProvider(canvas);

	// provides access to the different Path.mode by showing different input
	// fields
	console.log(CanvasDrawingMethod);
	drawingMethodSelector = new InputCollectorSelector(
			CanvasDrawingMethod.methods, "Path", "DrawingMethodAttributes");

	drawingMethodSelector.showIn("DrawingMethodSelector");

	styleApplierMethodSelector = new InputCollectorSelector(
			CanvasStyleApplierMethod.methods, "Style Applier",
			"StyleApplierMethodAttributes");
	styleApplierMethodSelector.showIn("StyleApplierMethodSelector");

	transformationMethodSelector = new InputCollectorSelector(
			CanvasTransformationMethod.methods, "Transformation",
			"TransformationMethodAttributes");
	transformationMethodSelector.showIn("TransformationMethodSelector");

	// adding everything to path is just for testing
	path = new Path();
	function PathAdderCallback(sender, methodInputCollector, method, valueList) {
		this.add(method, valueList);
	}
	drawingMethodSelector.userAcceptedEvent.register(path, PathAdderCallback);
	styleApplierMethodSelector.userAcceptedEvent.register(path,
			PathAdderCallback);
	transformationMethodSelector.userAcceptedEvent.register(path,
			PathAdderCallback);

	// draws stuff to canvas
	drawer = new Drawer(canvas.getContext("2d"), 0, 0, 800, 600);

	// creates code that could draw on canvas (this is just an additional output
	// and no requirement for Drawer or similar)
	coder = new Coder(document.getElementById("code"), "context");

	// lets Drawer and Coder react to changes in Path
	path.changedEvent.register(drawer, drawer.draw);
	path.changedEvent.register(coder, coder.show);

	// shows the box containing the different selectable modes of Path.modes on
	// page load
}
var drawingMethodSelector;
var styleApplierMethodSelector;
var transformationMethodSelector;
var path;
var drawer;
var coder;
var mouseInputProvider;
window.onload = init;
var current = 0;