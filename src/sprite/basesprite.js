var gamejs = require('gamejs');

var BaseSprite = exports.BaseSprite = function(rect) {
    BaseSprite.superConstructor.apply(this, arguments);

    this.rect = rect;

    return this;
};
gamejs.utils.objects.extend(BaseSprite, gamejs.sprite.Sprite);

BaseSprite.prototype.update = function() {
    // subclass of Sprite in gamejs is required to have this
};

BaseSprite.prototype.draw = function(surface) {
    if (this.image && this.rect) {
	 // Sprite class in gamejs draws this.image into this.rect
	 BaseSprite.superClass.draw.apply(this, arguments);
    }
    if (this.DEBUG_SPRITE_RECT && this.rect) {
	 gamejs.draw.rect(surface, "rgba(0,0,1,0.5)", this.rect, 0);
    }
    
    //	this is a good place to keep track of how many Sprites we are
    //	rendering every frame
};

BaseSprite.prototype.DEBUG_SPRITE_RECT = false;
