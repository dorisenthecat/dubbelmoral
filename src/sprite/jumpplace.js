var gamejs = require("gamejs");
var BaseSprite = require("./basesprite").BaseSprite;

var JumpPlace = exports.JumpPlace = function(rect) {
    JumpPlace.superConstructor.apply(this, arguments);
    return this;
};

gamejs.utils.objects.extend(JumpPlace, BaseSprite);
