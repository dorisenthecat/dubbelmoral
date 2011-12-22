var gamejs = require("gamejs");
var BaseSprite = require("./basesprite").BaseSprite;

var Lotsofbeer = exports.Lotsofbeer = function(rect) {
    Lotsofbeer.superConstructor.apply(this, arguments);
    return this;
};
gamejs.utils.objects.extend(Lotsofbeer, BaseSprite);

Lotsofbeer.prototype.placeInRoom = function(room) {
    room.drawables.add(this);
    room.activateables.add(this);
};

Lotsofbeer.prototype.activateMe = function(context) {
    context.student.drink.apply(context.student);
    return true;
};
