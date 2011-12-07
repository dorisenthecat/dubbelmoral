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
//called for every tick in the animation
//this is a good place to do movement (vx,vy) on cursor
AnimationFrame.prototype.tick = function(cursor, elapsed) {
};
//called when the frame is started
//this is a good place to set cursor.image for example
//or start some sound effect
AnimationFrame.prototype.begin = function(cursor) {
};
//called when the frame is ended
AnimationFrame.prototype.end = function(cursor) {
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
	     _animation.frames[_currentFrame].tick(_elapsedTicks);
	     if (_elapsedTicks >= _animation.frames[_currentFrame].ticks) {
		  _animation.frames[_currentFrame].end(cursor);
		  _currentFrame++;
		  if (_currentFrame < _animation.frames.length) {
		      _animation.frames[_currentFrame].begin(cursor);
		  }
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
    cursor.restartAnimation = function() {
	 _currentFrame = 0;
	 _elapsedTicks = 0;
	 
	 if (_animation.frames.length) {
	     _animation.frames[0].begin(cursor);
	 }
    };
    
    cursor.restartAnimation();
    return cursor;
};
