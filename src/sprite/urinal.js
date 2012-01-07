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

Urinal.prototype.activateMe = function(context) {
    //TODO check distance, direction u.s.w.
    
	if (context.student.score.drunkness > 70) {
		context.student.vomit.apply(context.student);
	} else if (context.student.score.peeiness > 0 && context.student.pee) {
		context.student.pee.apply(context.student);
	}

    return true;
};