var gamejs = require('gamejs');
var animation = require("../animation");
var BaseSprite = require("./basesprite").BaseSprite;

/*
 * AnimatedSprite
 * 
 * Methods
 *  update(msduration)
 *    Sets the Sprite's image according to the current animation frame
 */

var DIR_LEFT = exports.DIR_LEFT = "left";
var DIR_RIGHT = exports.DIR_RIGHT = "right";


var SpriteAnimation = exports.SpriteAnimation = function(defintion) {
    SpriteAnimation.superConstructor.apply(this, arguments);
    var frames = defintion.frames || [];
    
    for (var i = 0; i < frames.length; i++) {
	 var framedef = frames[i];
	 var frame = new SpriteAnimationFrame();
	 if (framedef.image) {
	     frame.image = gamejs.image.load(framedef.image);
	 }
	 if (framedef.vx) {
	     frame.vx = framedef.vx;
	 }
	 if (framedef.vy) {
	     frame.vy = framedef.vy;
	 }
	 if (framedef.ticks) {
	     frame.ticks = framedef.ticks;
	 }
	 this.frames.push(frame);
    }
    
    this.direction = defintion.direction = defintion.direction || DIR_RIGHT;
    
    return this;
};
gamejs.utils.objects.extend(SpriteAnimation, animation.Animation);

var SpriteAnimationFrame = exports.SpriteAnimationFrame = function() {
    SpriteAnimationFrame.superConstructor.apply(this, arguments);

    this.image = null;
    this.vx = 0;
    this.vy = 0;
    this.ticks = 10;

    return this;
};
gamejs.utils.objects.extend(SpriteAnimationFrame, animation.AnimationFrame);

SpriteAnimationFrame.prototype.begin = function(sprite) {
    sprite.image = this.image;
    sprite.vx += this.vx;
    sprite.vy += this.vy;
};

var AnimatedSprite = exports.AnimatedSprite = function(pos) {
    AnimatedSprite.superConstructor.apply(this, [new gamejs.Rect([0,0,1,1])]);
    this.position = [pos[0], pos[1]];
    
    this.vx = 0;
    this.vy = 0;
    this.direction = DIR_RIGHT;
    this.shouldMoveSprite = true;

    return this;
};
gamejs.utils.objects.extend(AnimatedSprite, BaseSprite);

AnimatedSprite.prototype.updateRect = function() {
    this.rect = new gamejs.Rect([0,0,1,1]);
    
    this.rect.width = this.image.getSize()[0];
    this.rect.height = this.image.getSize()[1];
    this.rect.top = this.position[1]-this.rect.height;
    this.rect.left = this.position[0] - Math.ceil(this.rect.width/2);
};

AnimatedSprite.prototype.updatePosition = function() {
   this.position[0] = this.rect.center[0];
   this.position[1] = this.rect.bottom;
};

AnimatedSprite.prototype.update = function(msduration) {
    AnimatedSprite.superClass.update.apply(this, arguments);
    this.vx = 0;
    this.vy = 0;
    if (this.updateAnimation) {
	 this.updateAnimation();
    }
    
    if (this.shouldMoveSprite) {
	 this.position[0] += this.vx;
	 this.position[1] += this.vy;
	 this.updateRect();
    }
};

AnimatedSprite.prototype.startAnimation = function(animation, loop) {
    //    if (animation.loop
    if (this.runningAnimation !== animation) {
	 this.runningAnimation = animation;
	 var self = this;
	 animation.start(this, function(sprite) {
				self.restartAnimation();
			   });
    }
};
