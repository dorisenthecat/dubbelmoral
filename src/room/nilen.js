var gamejs = require('gamejs');
var room = require('./room');
var beer = require('../sprite/beer');
var branch = require('../sprite/branch');
var ladder = require('../sprite/ladder');
var urinal = require("../sprite/urinal");

gamejs.preload(["images/nilen.png"]);

//Constants
var GROUND_HEIGHT = 2;
var MAX_BOTTLES = 4;

var Nilen = exports.Nilen = function() {
	Nilen.superConstructor.apply(this, arguments);

    this.backgroundImage = gamejs.image.load("images/nilen.png"); // todo: load once, not per object

    return this;
};
gamejs.utils.objects.extend(Nilen, room.Room);

Nilen.prototype.init = function() {
	Nilen.superClass.init.apply(this, arguments);
	
	var b = new branch.Branch([100,50]);
	
	this.drawables.add(b);
	this.updateables.add(b);
    
    var u = new urinal.Urinal(new gamejs.Rect([113,164,10,20]));
    this.drawables.add(u);
    this.activateables.add(u);

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
};
