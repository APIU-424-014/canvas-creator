function Drawer(where, x, y, w, h) {
	this.context = where;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}
Drawer.prototype.draw = function(what) {
	console.log("drawing", what);
	this.context.save(); // backup state
	this.context.translate(-this.x, -this.y); // moving area to new zero/zero

	// prevent outer area to be painted
	this.context.beginPath();
	this.context.rect(0, 0, this.w, this.h);
	this.context.clip();

	this.context.clearRect(0, 0, this.w, this.h);
	this.context.beginPath();
	what.draw(this.context);

	this.context.fill(); // fills the path
	this.context.stroke(); // draws the line of the path
	this.context.translate(this.x, this.y); // moving back to old zero/zero

	this.context.restore(); // loading state (undo clipping)
};