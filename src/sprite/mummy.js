var gamejs = require("gamejs");

var spriteanimation = require("./animatedsprite");

gamejs.preload(["images/mummy/mummy_walk_left_1.png"]);
gamejs.preload(["images/mummy/mummy_walk_left_2.png"]);
gamejs.preload(["images/mummy/mummy_walk_left_3.png"]);
gamejs.preload(["images/mummy/mummy_walk_right_1.png"]);
gamejs.preload(["images/mummy/mummy_walk_right_2.png"]);
gamejs.preload(["images/mummy/mummy_walk_right_3.png"]);
gamejs.preload(["images/mummy/mummy_push.png"]);

var Mummy = exports.Mummy = function(direction, leftmost, rightmost) {
    Mummy.superConstructor.apply(this, arguments);

    var self;
    this.animations = {};
    this.maxLeft = leftmost;
    this.maxRight = rightmost;
    
    this.animations.idleLeft = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
       {ticks: 4, image: "images/mummy/mummy_walk_left_1.png", vx: -4, vy: 0},
	     ]
	 }
   );
   this.animations.idleRight = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
       {ticks: 4, image: "images/mummy/mummy_walk_right_1.png", vx: -4, vy: 0},
	     ]
	 }
   );
    
    this.animations.walkLeft = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/mummy/mummy_walk_left_1.png", vx: -4, vy: 0},
		  {ticks: 4, image: "images/mummy/mummy_walk_left_2.png", vx: -4, vy: 0},
		  {ticks: 4, image: "images/mummy/mummy_walk_left_3.png", vx: -4, vy: 0}
	     ]
	 }
    );
    this.animations.walkRight = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/mummy/mummy_walk_right_1.png", vx: 4, vy: 0},
		  {ticks: 4, image: "images/mummy/mummy_walk_right_2.png", vx: 4, vy: 0},
		  {ticks: 4, image: "images/mummy/mummy_walk_right_3.png", vx: 4, vy: 0}
	     ]
	 }
    );
    this.animations.push = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 12, image: "images/mummy/mummy_push.png", vx: 0, vy: 0}
	     ]
	 }
    );
    
    this.startAnimation(this.animations.walkLeft, false);
    
    return this;
};
gamejs.utils.objects.extend(Mummy, spriteanimation.AnimatedSprite);

Mummy.prototype.update = function(msduration, context) {
    if(this.isAnimationFinished()) {
      this.startAnimation(this.animations.idleLeft, false);
      
      if(context.student.rect.collideRect(this.rect)) {
        this.startAnimation(this.animations.push, false);
        context.student.fall(); //TODO: Change to student.hit()? 
        context.student.score.damage += 10;
      }
      else if(context.student.position[0] > this.position[0] 
              && this.position[0] < this.maxRight) {
        this.startAnimation(this.animations.walkRight, false);
      }
      else if(context.student.position[0] < this.position[0]
              && this.position[0] > this.maxLeft) {
        this.startAnimation(this.animations.walkLeft, false);
      }
    }
    
    Mummy.superClass.update.apply(this, arguments);
};
