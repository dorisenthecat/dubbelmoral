var gamejs = require('gamejs');
var basesprite = require('./basesprite');

var Ladder = exports.Ladder = function (rect) {
	Ladder.superConstructor.apply(this, arguments);
	
	return this;
};

gamejs.utils.objects.extend(Ladder, basesprite.BaseSprite);

Ladder.prototype.placeInRoom = function(room) {
    room.drawables.add(this);
    room.ladders.add(this);
};
