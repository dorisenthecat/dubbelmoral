var gamejs = require('gamejs');
var room = require('./room');
var beer = require('../sprite/beer');
var branch = require('../sprite/branch');
var ladder = require('../sprite/ladder');
var urinal = require("../sprite/urinal");

gamejs.preload(["images/fontanen.png"]);

//Constants
var GROUND_HEIGHT = 2;
var MAX_BOTTLES = 4;

var Fontanen = exports.Fontanen = function() {
	Fontanen.superConstructor.apply(this, arguments);
	
	var b = new branch.Branch([100,50]);
	
	this.drawables.add(b);
	this.updateables.add(b);
	
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
	
	//Add ladder to the tree
	this.ladders.add(new ladder.Ladder(new gamejs.Rect([215,88], [12,95])));
	    
    this.backgroundImage = gamejs.image.load("images/fontanen.png"); // todo: load once, not per object
    
    return this;
};
gamejs.utils.objects.extend(Fontanen, room.Room);