var gamejs = require("gamejs");
var BaseSprite = require("./basesprite").BaseSprite;

/**
 * Urinal
 *
 * pickupable
 *
 * Triggers peeing and vommiting.
 */

var Urinal = exports.Urinal = function(rect) {
    Urinal.superConstructor.apply(this, arguments);
};
gamejs.utils.objects.extend(Urinal, BaseSprite);
