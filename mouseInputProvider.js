function MouseInputProvider(htmlElement) {
	this.htmlElement = htmlElement;
	console.log(this.htmlElement);
	this.clickEvent = new Event();// (sender,x,y);
	var that = this;
	this.htmlElement.onclick = function(e) {
		MouseInputProvider.onclickRedirector.call(this, e, that);
	};
}
MouseInputProvider.onclickRedirector = function(e, target) {
	if (!e)
		e = window.event;
	console.log(e, target);
	//x = X of parent - X of top left corner of this ⁻ border
	var x = e.clientX -this.offsetLeft - this.clientLeft;
	var y = e.clientY - this.offsetTop - this.clientTop;
	target.clickEvent.emit(x, y);
};