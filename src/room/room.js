var gamejs = require('gamejs');

/*
 * Room class
 * 
 * Members
 *  backgroundImage (Surface)
 *  positionOnMap (Array of length 2)
 *  ladders (SpriteGroup)
 *  solids (SpriteGroup)
 *  platforms (SpriteGroup)
 *  drawables (SpriteGroup)
 *  updateables (SpriteGroup)
 *  jumpPlaces (SpriteGroup)
 *  pickupables  (Spritegroup)
 * 
 * Methods
 *  update(msduration)
 *  draw(surface)
 *  init
 *  enter(sprite, direction)
 */

var Room = exports.Room = function() {
    this.backgroundImage = null;
    this.positionOnMap = [0, 0];
    this.updateables = new gamejs.sprite.Group();
    this.drawables = new gamejs.sprite.Group();
	this.ladders = new gamejs.sprite.Group();
    return this;
};

Room.prototype.draw = function(surface) {
    if (this.backgroundImage) {
	 surface.blit(this.backgroundImage);
    } else {
	 surface.fill("purple");
    }
    this.drawables.draw.apply(this.drawables, arguments);
};

Room.prototype.update = function(msduration) {
    this.updateables.update.apply(this.updateables, arguments);
};
