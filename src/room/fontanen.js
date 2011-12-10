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

  this.backgroundImage = gamejs.image.load("images/fontanen.png"); // todo: load once, not per object
  
  return this;
};
gamejs.utils.objects.extend(Fontanen, room.Room);