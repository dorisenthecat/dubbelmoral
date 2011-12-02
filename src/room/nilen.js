var gamejs = require('gamejs');
var room = require('./room');
var beer = require('../sprite/beer');

gamejs.preload(["images/nilen.png"]);

var Nilen = exports.Nilen = function() {
	Nilen.superConstructor.apply(this, arguments);
	
	//Add beer bottles
	var numberOfBeer = Math.floor(Math.random()*5); // 0-4 bottles
	for(var i=0; i<numberOfBeer; i++) {
		var x = Math.floor(Math.random()*182); //Place bottle somewhere between 0 and 181
		//TODO: Check if a bottle already exists in this position
		this.drawables.add(new beer.Beer([x,175]));  //TODO: Do not hard code Y
	}
	    
    this.backgroundImage = gamejs.image.load("images/nilen.png"); // todo: load once, not per object
    
    return this;
};
gamejs.utils.objects.extend(Nilen, room.Room);
