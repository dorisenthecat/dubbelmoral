var gamejs = require('gamejs');
var room = require('./room');
var Platform = require('../sprite/platform').Platform;

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
};
