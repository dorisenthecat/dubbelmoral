var gamejs = require('gamejs');
var room = require('./room');
var Platform = require('../sprite/platform').Platform;
var Ladder = require("../sprite/ladder").Ladder;
var Drunk = require("../sprite/drunk").Drunk;
var beer = require("../sprite/beer");

gamejs.preload(["images/akademiska.png"]);

var Akademiska = exports.Akademiska = function() {
	Akademiska.superConstructor.apply(this, arguments);

    this.backgroundImage = gamejs.image.load("images/akademiska.png"); // todo: load once, not per object
    this.positionOnMap = [125, 62];

    return this;
};
gamejs.utils.objects.extend(Akademiska, room.Room);

Akademiska.prototype.init = function() {
	Akademiska.superClass.init.apply(this, arguments);
    
    var balcony = new Platform(new gamejs.Rect([219, 78, 90, 5]));
    balcony.placeInRoom(this);
    
    var leftPillar = new Ladder(new gamejs.Rect([219, 72, 10, 182]));
    leftPillar.placeInRoom(this);

    var rightPillar = new Ladder(new gamejs.Rect([302, 72, 10, 182]));
    rightPillar.placeInRoom(this);

	var drunk = new Drunk(new gamejs.Rect([69, 140, 23,27]));
	drunk.placeInRoom(this);
	
	var MAX_BOTTLES = 4;
	var numberOfBeer = Math.floor(Math.random()*MAX_BOTTLES+1);
	var bottles_left = 229;
	var bottles_right = 295;
	var bottle_bottom = 78;
    for(var i=0; i<numberOfBeer; i++) {
      var bottle = new beer.Beer();
      bottle.rect.left = Math.ceil(bottles_left + Math.random()*(bottles_right-bottles_left-bottle.rect.width/2));
      bottle.rect.bottom = bottle_bottom;
      bottle.placeInRoom(this);
    }
};
