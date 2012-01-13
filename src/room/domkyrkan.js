var gamejs = require('gamejs');
var room = require('./room');
var Ladder = require("../sprite/ladder").Ladder;
var Police = require("../sprite/police").Police;

var Lotsofbeer = require("../sprite/lotsofbeer").Lotsofbeer;

gamejs.preload(["images/domkyrkan.png"]);

var Domkyrkan = exports.Domkyrkan = function() {
  Domkyrkan.superConstructor.apply(this, arguments);

  this.backgroundImage = gamejs.image.load("images/domkyrkan.png"); // todo: load once, not per object
  this.positionOnMap = [85, 162];
    
  return this;
};
gamejs.utils.objects.extend(Domkyrkan, room.Room);

Domkyrkan.prototype.init = function() {
    Domkyrkan.superClass.init.apply(this, arguments);

    var beerBunch = new Lotsofbeer(new gamejs.Rect([280, 175, 130, 10]));
    beerBunch.placeInRoom(this);

    var tree = new Ladder(new gamejs.Rect([47,88], [12,95]));
    tree.placeInRoom(this);
    
    var police = new Police([82, this.FLOOR_LEVEL], 16, 126);
    police.placeInRoom(this);
};
