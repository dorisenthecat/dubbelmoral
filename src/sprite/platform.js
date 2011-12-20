var gamejs = require("gamejs");

var BaseSprite = require("./basesprite").BaseSprite;

var Platform = exports.Platform = function(rect) {
    Platform.superConstructor.apply(this, arguments);
    
    return this;
};
gamejs.utils.objects.extend(Platform, BaseSprite);

Platform.prototype.placeInRoom = function(room) {
    room.drawables.add(this);
    room.platforms.add(this);
};
