function Event(sender) {
	this.sender = sender;
	this.thisObjects = [];
	this.methods = [];
}
Event.prototype.register = function(thisObject, method) {
	// adds a method to be called on emit
	// method: function(sender, argumentList){'this' is set to be 'thisObject';}
	this.thisObjects.push(thisObject);
	this.methods.push(method);
};
Event.prototype.unregister = function(thisObject, method) {
	// removes a method
	for (var i = 0; i < this.selfs.length; i++) {
		if (this.thisObjects[i] === thisObject && this.methods[i] === method) {
			this.thisObjects.splice(i, 1); // splice==verbinden
			this.methods.splice(i, 1);
			return true;
		}
	}
	return false;
};
Event.prototype.emit = function(content) {
	// calls all registered methods

	// composing the arguments list by prepending the sender object
	var allArguments = [ this.sender ];// sender is the origin of the event
	for (var i = 0; i < arguments.length; i++) {
		allArguments.push(arguments[i]);// arguments refers to arguments passed
		// to this function. arguments only looks like an array but isn't.
	}

	for (var i = 0; i < this.thisObjects.length; i++) {
		this.methods[i].apply(this.thisObjects[i], allArguments);
	}
};