var gamejs = require('gamejs');
var basesprite = require('./basesprite');

var Ladder = exports.Ladder = function (rect) {
	Ladder.superConstructor.apply(this, arguments);
	
	return this;
};

Ladder.prototype.update = function(msduration) {
  
};
gamejs.utils.objects.extend(Ladder, basesprite.BaseSprite);