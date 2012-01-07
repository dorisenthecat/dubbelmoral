var gamejs = require('gamejs');
var basesprite = require('./basesprite');

gamejs.preload(["images/beer.png"]);  //TODO: Should load from sprites.png?


var Beer = exports.Beer = function () {
	Beer.superConstructor.apply(this, arguments);
	
	this.rect = new gamejs.Rect([0,0], [4,8]);      //TODO: How to get size of sprite?
	this.image = gamejs.image.load("images/beer.png"); //TODO: Should be done once, not per instance
	
	return this;
};

gamejs.utils.objects.extend(Beer, basesprite.BaseSprite);

Beer.prototype.activateMe = function(context) {
    //TODO check distance, direction u.s.w.
    
    context.student.drink.apply(context.student);
    
    context.room.activateables.remove(this);
    context.room.drawables.remove(this);
    
    return true;
};
