/*
 * Animation
 * 
 * Members
 *  frames (Array)
 * 
 * Methods
 *  startAnimation(animationCursor, finished)
 */

var Animation = exports.Animation = function() {
    this.frames = [];
};

Animation.prototype.start = function(cursor, finished) {
    return initCursor(cursor || {}, this, finished);
};

/*
 * AnimationFrame
 *
 * Members
 *  ticks
 */
var AnimationFrame = exports.AnimationFrame = function() {
};

/*
 * AnimationCursor (interface)
 * 
 * Methods
 *  updateAnimation()
 *  isAnimationFinished()
 */
function initCursor(cursor, animation, finished) {
    var _currentFrame = 0;
    var _elapsedTicks = 0;
    var _animation = animation;
    var _finished = finished;
    cursor.updateAnimation = function () {
	 var done;
	 _elapsedTicks++;
	 if (_currentFrame < _animation.frames.length) {
	     if (_elapsedTicks >= _animation.frames[_currentFrame].ticks) {
		  _currentFrame++;
		  _elapsedTicks = 0;
	     }
	 }
	 done = (_currentFrame >= _animation.frames.length);
	 if (done && _finished) {
	     _finished(_animation);
	 }
    };
    cursor.isAnimationFinished = function() {
	 return (_currentFrame >= _animation.frames.length);
    };
    return cursor;
};
