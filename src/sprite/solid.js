var gamejs = require("gamejs");

var BaseSprite = require("./basesprite").BaseSprite;

var Solid = exports.Solid = function(rect) {
    Solid.superConstructor.apply(this, arguments);
    
    return this;
};
gamejs.utils.objects.extend(Solid, BaseSprite);

Solid.prototype.placeInRoom = function(room) {
    room.drawables.add(this);
    room.solids.add(this);
};
