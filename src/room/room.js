var gamejs = require('gamejs');

var portal = require("../sprite/portal");

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
    this.updateables = this.updatables = new gamejs.sprite.Group();
    this.drawables = new gamejs.sprite.Group();
    this.ladders = new gamejs.sprite.Group();
    this.platforms = new gamejs.sprite.Group();
    this.activateables = this.activatables = new gamejs.sprite.Group();
    this.portalwalkers = new gamejs.sprite.Group();
    return this;
};

Room.prototype.draw = function(surface) {
    if (this.backgroundImage) {
	 surface.blit(this.backgroundImage);
    } else {
	 surface.fill("purple");
    }
    this.drawables.draw.apply(this.drawables, arguments);
    this.ladders.draw.apply(this.ladders, arguments);
    this.platforms.draw.apply(this.platforms, arguments);
};

Room.prototype.update = function(msduration) {
    this.updateables.update.apply(this.updateables, arguments);
};

Room.prototype.init = function() {
    this.updateables.empty();
    this.drawables.empty();
    this.ladders.empty();
    this.platforms.empty();
    this.activateables.empty();
    this.portalwalkers.empty();
    
    portal.createPortals(this);    
};
