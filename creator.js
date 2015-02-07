function init() {

	// draw stuff to see whether canvas does work
	var canvas = document.getElementById("draw");
	var con = canvas.getContext("2d");
	con.fillStyle = "rgba(128,128,128,1)";
	con.rect(50, 50, 100, 100);
	con.rect(100, 100, 100, 100);
	con.strokeStyle = "rgba(0,0,0,255)";
	con.lineWidth = 3;
	con.stroke();
	con.fill();
	con.beginPath();
	con.fillStyle = "rgba(128,255,128,0.5)";
	// con.rect(50,50,150,150);
	con.fill();

	
	// TODO: these lines should be moved to an own class when other drawing
	// methods are implemented
	var path = document.getElementById("cursor_path");
	path.onchange = showPathBox;

	
	//collects clicks on canvas
	mouseInputProvider = new MouseInputProvider(canvas);
	
	//provides access to the different Path.mode by showing different input fields
	pathCollector = new PathCollector();
	
	//draws stuff to canvas
	drawer = new Drawer(canvas.getContext("2d"), 0, 0, 800, 600);
	
	//creates code that could draw on canvas (this is just an additional output and no requirement for Drawer or similar) 
	coder = new Coder(document.getElementById("code"), "context");
	
	//lets Drawer and Coder react to changes in Path
	pathCollector.path.changedEvent.register(drawer, drawer.draw);
	pathCollector.path.changedEvent.register(coder, coder.show);
	
	//shows the box containing the different selectable modes of Path.modes on page load
	showPathBox();
}
var pathCollector;
var drawer;
var coder;
var mouseInputProvider;

function showPathBox() {
	var sub_holder = document.getElementById("sub_holder");
	if (sub_holder.firstChild) {
		//moving other element out of the box
		sub_holder.firstChild.style.visibility = "hidden";
		document.body.appendChild(sub_holder.firstChild);
	}
	
	//moving the Path.modes selector box to its place
	var pce = pathCollector.getElement();
	pce.style.visibility = "visible";
	sub_holder.appendChild(pce);
}
window.onload = init;
var current = 0;