var gamejs = require("gamejs");
var room = require("./room");
var Solid = require("../sprite/solid").Solid;

gamejs.preload(["images/fontanen.png"]);

var Fontanen = exports.Fontanen = function() {
  Fontanen.superConstructor.apply(this, arguments);

  this.backgroundImage = gamejs.image.load("images/fontanen.png"); // todo: load once, not per object
  this.positionOnMap = [100, 46];

  return this;
};
gamejs.utils.objects.extend(Fontanen, room.Room);

Fontanen.prototype.init = function() {
    Fontanen.superClass.init.apply(this, arguments);
    
    var leftRock = new Solid(new gamejs.Rect([40,180,12,8]));
    leftRock.placeInRoom(this);

    var rightRock = new Solid(new gamejs.Rect([275,180,12,8]));
    rightRock.placeInRoom(this);
};
