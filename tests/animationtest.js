var animation = require("../src/animation");

exports.run = function() {
    qModule("animation");

    test("isAnimationFinished", function() {
	 //is this method correct if called from end() of the last
	 //frame?? I don't think so..
    });
};
