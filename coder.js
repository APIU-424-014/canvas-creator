function Coder(where, nameOfContext) {
	this.where = where;
	this.nameOfContext = nameOfContext;
}
Coder.prototype.show = function(what) {
	this.where.innerHTML = what.toCode(this.nameOfContext);
};