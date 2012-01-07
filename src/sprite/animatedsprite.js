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
var DIR_UP = exports.DIR_UP = "up";
var DIR_DOWN = exports.DIR_DOWN = "down";


var SpriteAnimation = exports.SpriteAnimation = function(definition) {
    SpriteAnimation.superConstructor.apply(this, arguments);
    var frames = definition.frames || [];
    
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
    
    if (definition.interrupt) {
	 this.interrupt = definition.interrupt;
    }
    if (definition.begin) {
	 if (this.frames.length > 0) {
	     this.frames[0].beginEx = definition.begin;
	 }
    }
    if (definition.end) {
	 if (this.frames.length > 0) {
	     this.frames[this.frames.length-1].endEx = definition.end;
	 }
    }
    this.direction = definition.direction;
    
    return this;
};
gamejs.utils.objects.extend(SpriteAnimation, animation.Animation);

SpriteAnimation.prototype.interrupt = function(cursor) {
    
};

SpriteAnimation.prototype.start = function() {
    var sprite = SpriteAnimation.superClass.start.apply(this, arguments);
	if (this.direction) {
		sprite.direction = this.direction;
	}
};

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
    if (this.image) {
	 sprite.image = this.image;
    }
    sprite.vx += this.vx;
    sprite.vy += this.vy;
    if (this.beginEx) {
	 this.beginEx.apply(this, arguments);
    }
};

SpriteAnimationFrame.prototype.end = function(sprite) {
    if (this.endEx) {
	 this.endEx.apply(this, arguments);
    }
};

var AnimatedSprite = exports.AnimatedSprite = function(pos) {
    AnimatedSprite.superConstructor.apply(this, [new gamejs.Rect([0,0,1,1])]);
    this.position = [pos[0], pos[1]];
    
    this.vx = 0;
    this.vy = 0;
    this.old_vx = 0;
    this.old_vy = 0;
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
   this.position[0] = Math.ceil(this.rect.center[0]);
   this.position[1] = this.rect.bottom;
};

AnimatedSprite.prototype.update = function(msduration) {
    AnimatedSprite.superClass.update.apply(this, arguments);
    this.vx = 0;
    this.vy = 0;
    this.old_x = this.position[0];
    this.old_y = this.position[1];

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
	 if (this.runningAnimation && !this.runningAnimation.isAnimationFinished) {
	     this.runningAnimation.interrupt();
	 }
	 this.runningAnimation = animation;
	 var self = this;
	 animation.start(this, function(sprite) {
	     if (loop) {
		  self.restartAnimation();
	     }
	 });
    }
};
