function init() {

	// draw stuff to see whether canvas does work
	var canvas = document.getElementById("draw");
	var context = canvas.getContext("2d");
	context.fillStyle = "rgba(128,128,128,0.5)";
	context.strokeStyle = "rgba(255,0,0,0.5)";
	context.lineWidth = 3;
	context.moveTo(70, 70);
	context.lineTo(100, 70);//here the path ends
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

	// TODO: these lines should be moved to an own class when other drawing
	// methods are implemented
	var path = document.getElementById("cursor_path");
	path.onchange = showPathBox;

	// collects clicks on canvas
	mouseInputProvider = new MouseInputProvider(canvas);

	// provides access to the different Path.mode by showing different input
	// fields
	pathCollector = new PathCollector();

	// draws stuff to canvas
	drawer = new Drawer(canvas.getContext("2d"), 0, 0, 800, 600);

	// creates code that could draw on canvas (this is just an additional output
	// and no requirement for Drawer or similar)
	coder = new Coder(document.getElementById("code"), "context");

	// lets Drawer and Coder react to changes in Path
	pathCollector.path.changedEvent.register(drawer, drawer.draw);
	pathCollector.path.changedEvent.register(coder, coder.show);

	// shows the box containing the different selectable modes of Path.modes on
	// page load
	showPathBox();
}
var pathCollector;
var drawer;
var coder;
var mouseInputProvider;

function showPathBox() {
	var sub_holder = document.getElementById("sub_holder");
	if (sub_holder.firstChild) {
		// moving other element out of the box
		sub_holder.firstChild.style.visibility = "hidden";
		document.body.appendChild(sub_holder.firstChild);
	}

	// moving the Path.modes selector box to its place
	var pce = pathCollector.getElement();
	pce.style.visibility = "visible";
	sub_holder.appendChild(pce);
}
window.onload = init;
var current = 0;