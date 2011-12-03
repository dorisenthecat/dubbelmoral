var gamejs = require('gamejs');
var room = require('./room');
var beer = require('../sprite/beer');

gamejs.preload(["images/nilen.png"]);

//Constants
var GROUND_HEIGHT = 2;
var MAX_BOTTLES = 4;

var Nilen = exports.Nilen = function() {
	Nilen.superConstructor.apply(this, arguments);
	
	//Add beer bottles
	var numberOfBeer = Math.floor(Math.random()*MAX_BOTTLES+1);
	for(var i=0; i<numberOfBeer; i++) {
		var bottle = new beer.Beer();
		
		//Place bottle somewhere on the ground
		bottle.rect.left = Math.floor(Math.random()*gamejs.display.getSurface().getSize()[0] - bottle.rect.width);
		bottle.rect.top = Math.floor(gamejs.display.getSurface().getSize()[1] - bottle.rect.height - GROUND_HEIGHT);
					
		//TODO: Check if a bottle already exists in this position
		
		this.drawables.add(bottle);
	}
	    
    this.backgroundImage = gamejs.image.load("images/nilen.png"); // todo: load once, not per object
    
    return this;
};
gamejs.utils.objects.extend(Nilen, room.Room);
