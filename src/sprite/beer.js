var gamejs = require('gamejs');

gamejs.preload(["images/beer.png"]);  //TODO: Should load from sprites.png?


/**
 * \param position array of size 2 containing the position of the beerbottle
 */
var Beer = exports.Beer = function (position) {
	Beer.superConstructor.apply(this, arguments);
	
	this.rect = position;
	this.image = gamejs.image.load("images/beer.png"); //TODO: Should be done once, not per instance
	
	return this;
};

Beer.prototype.update = function(msduration) {
  
};

gamejs.utils.objects.extend(Beer, gamejs.sprite.Sprite);
