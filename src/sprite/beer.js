var gamejs = require('gamejs');

gamejs.preload(["images/beer.png"]);  //TODO: Should load from sprites.png?


var Beer = exports.Beer = function () {
	Beer.superConstructor.apply(this, arguments);
	
	this.rect = new gamejs.Rect([0,0], [4,8]);      //TODO: How to get size of sprite?
	this.image = gamejs.image.load("images/beer.png"); //TODO: Should be done once, not per instance
	
	return this;
};

Beer.prototype.update = function(msduration) {
  
};

gamejs.utils.objects.extend(Beer, gamejs.sprite.Sprite);
