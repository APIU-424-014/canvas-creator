function MouseInputProvider(canvas) {
	// TODO: decide whether or not to suppress mouseevents originated in the element border
	// TODO: (low priority) distinguish between mouse buttons
	this.canvas = canvas;
	this.mouseDown = null;
	this.leftAt = null;
	this.clickEvent = new Event();// (sender,x,y);
	this.mouseDownEvent = new Event(); // (sender, x,y);
	this.mouseUpEvent = new Event(); // (sender,x,y);
	this.mouseDownMoveEvent = new Event();// (sender,xCurrent,yCurrent,xDown,yDown)
	this.mouseUpMoveEvent = new Event();// (sender,xUp,yUp,xDown,yDown)
	this.mouseMoveEvent = new Event();// (sender,x,y)
	var that = this;
	this.canvas.onclick = function(e) {
		MouseInputProvider.onclickRedirector.call(this, e, that);
	};
	this.canvas.onmousedown = function(e) {
		MouseInputProvider.onmousedownRedirector.call(this, e, that);
	};
	this.canvas.onmouseup = function(e) {
		MouseInputProvider.onmouseupRedirector.call(this, e, that);
	};
	this.canvas.onmousemove = function(e) {
		MouseInputProvider.onmousemoveRedirector.call(this, e, that);
	};
	// TODO: detect mouseleave by alt+tab using mouseout (respectively using
	// mouseout to detect reentrance of the cursor to browser window, the point
	// on a straight line between mousedown and first mouseout where crossing
	// the canvas border is probably the best guess to use as up point)
	this.canvas.onmouseleave = function(e) {// detecting button down on leaving
		MouseInputProvider.onmouseleaveRedirector.call(this, e, that);
	};
	this.canvas.onmouseenter = function(e) {
		// emitting mouseUpEvent on reentrance with button up after leaving with
		// button down. To avoid Down>Down>Up sequences.
		MouseInputProvider.onmouseenterRedirector.call(this, e, that);
	};
}
MouseInputProvider.getCanvasCoordinate = function(mouseEvent, canvas) {
	// TODO: cross browser test
	// TODO: include canvas transformation into calculation
	if (!mouseEvent)
		mouseEvent = window.event;
	console.log(mouseEvent, canvas);
	var x = mouseEvent.pageX - canvas.offsetLeft - canvas.clientLeft;
	var y = mouseEvent.pageY - canvas.offsetTop - canvas.clientTop;
	return [ x, y ];
};
MouseInputProvider.onclickRedirector = function(e, target) {
	var point = MouseInputProvider.getCanvasCoordinate(e, target.canvas);
	target.clickEvent.emit(point[0], point[1]);
};
MouseInputProvider.onmousedownRedirector = function(e, target) {
	var point = MouseInputProvider.getCanvasCoordinate(e, target.canvas);
	target.mouseDown = point;
	target.mouseDownEvent.emit(point[0], point[1]);
};
MouseInputProvider.onmousemoveRedirector = function(e, target) {
	var point = MouseInputProvider.getCanvasCoordinate(e, target.canvas);
	target.mouseMoveEvent.emit(point[0], point[1]);
	if (target.mouseDown) {
		target.mouseDownMoveEvent.emit(point[0], point[1], target.mouseDown[0],
				target.mouseDown[1]);
	} else {
		target.mouseUpMoveEvent.emit(point[0], point[1]);
	}
};
MouseInputProvider.onmouseupRedirector = function(e, target) {
	var point = MouseInputProvider.getCanvasCoordinate(e, target.canvas);
	if (target.mouseDown) {
		var downPoint = target.mouseDown;
		target.mouseDown = null;
		target.mouseUpEvent
				.emit(downPoint[0], downPoint[1], point[0], point[1]);
	}
};
MouseInputProvider.onmouseleaveRedirector = function(e, target) {
	var point = MouseInputProvider.getCanvasCoordinate(e, target.canvas);
	if (target.mouseDown) {
		target.leftAt = point;
	}
};
MouseInputProvider.onmouseenterRedirector = function(e, target) {
	if (target.leftAt && e.buttons === 0) {
		var downPoint = target.mouseDown;
		var upPoint = target.leftAt;
		target.mouseDown = null;
		target.leftAt = null;
		target.mouseUpEvent.emit(upPoint[0], upPoint[1], downPoint[0],
				downPoint[1]);
	} else {
		target.leftAt = null;
	}
};