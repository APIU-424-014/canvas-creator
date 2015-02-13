function MouseInfoOutput(inputProvider) {
	this.inputProvider = inputProvider;
	this.inputProvider.mouseDownMoveEvent.register(this, this.mouseDownMove);
	this.inputProvider.mouseUpMoveEvent.register(this, this.mouseUpMove);
	this.inputProvider.mouseUpEvent.register(this, this.mouseUp);
	this.rect = null;
	this.text = "test";
	this.enabled = false;
	this.canvas = null;
	this.lastTime = 0;
	this.fps = 0;
}
MouseInfoOutput.prototype.mouseDownMove = function(sender, xCurrent, yCurrent,
		xDown, yDown) {
	this.rect = [ xDown, yDown, xCurrent - xDown, yCurrent - yDown ];
	this.text = "(" + xCurrent + "/" + yCurrent + ") - [" + (xCurrent - xDown)
			+ "/" + (yCurrent - yDown) + "]";
};
MouseInfoOutput.prototype.mouseUpMove = function(sender, x, y) {
	this.text = "(" + x + "/" + y + ")";
};
MouseInfoOutput.prototype.setAutoDrawCanavs = function(canvas, enable) {
	this.canvas = canvas;
	this.enabled = true;
	var that = this;
	this.lastTime = (new Date()).getTime();
	window.requestAnimationFrame(function() {
		console.log(this);
		that.draw(that.canvas.getContext('2d'));
	});
};
MouseInfoOutput.prototype.stopAutoDraw = function() {
	this.enabled = false;
	this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
MouseInfoOutput.prototype.draw = function(context) {
	var time = (new Date()).getTime();
	var old = this.lastTime;
	this.lastTime = time;
	time = time - old;
	this.fps = ((this.fps * 9) + (1 / (time / 1000))) / 10;
	context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	context.font = "48px serif";
	context.fillText(this.text, 50, 50);
	context.font = "24px serif";
	context.fillText(this.fps, 50, 75);
	context.fillText(1 / (time / 1000), 50, 100);
	if (this.rect) {
		context.beginPath();
		context.rect(this.rect[0], this.rect[1], this.rect[2], this.rect[3]);
		context.strokeStyle = "rgba(255,0,0,1)";

		context.stroke();
	}
	if (this.enabled) {
		var that = this;
		window.requestAnimationFrame(function() {
			that.draw(context);
		});
	}
};