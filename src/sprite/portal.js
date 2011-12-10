var gamejs = require("gamejs");
var BaseSprite = require("./basesprite").BaseSprite;

var LEFT_PORTAL = 1;
var RIGHT_PORTAL = 2;

exports.createPortals = function(room) {
    var lPortal = new Portal(new gamejs.Rect([0, 0, 5, 185]), LEFT_PORTAL, room);
    var rPortal = new Portal(new gamejs.Rect([326-5, 0, 5, 185]), RIGHT_PORTAL, room);
};

var Portal = exports.Portal = function(rect, which, room) {
    Portal.superConstructor.apply(this, arguments);

    this.which = which;
    this.portalwalkers = room.portalwalkers;

    room.updateables.add(this);
    room.drawables.add(this);

    return this;
};
gamejs.utils.objects.extend(Portal, BaseSprite);

Portal.prototype.update = function(msduration, context) {
    Portal.superClass.update.apply(this, arguments);

    var self = this;
    gamejs.sprite.spriteCollide(self, self.portalwalkers, false).forEach(
	 function (sprite) {
	     if (self.which === LEFT_PORTAL) {
		  sprite.rect.right = 326-5-1;
		  sprite.updatePosition();
		  context.switchRoomLeft();
	     } else {
		  sprite.rect.left = 5+1;
		  sprite.updatePosition();
		  context.switchRoomRight();
	     }
	 });
};
