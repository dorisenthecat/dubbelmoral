var gamejs = require("gamejs");

var spriteanimation = require("./animatedsprite");

gamejs.preload(["images/police/police_stand_left_1.png"]);
gamejs.preload(["images/police/police_stand_right_1.png"]);
gamejs.preload(["images/police/police_walk_left_1.png"]);
gamejs.preload(["images/police/police_walk_left_2.png"]);
gamejs.preload(["images/police/police_walk_right_1.png"]);
gamejs.preload(["images/police/police_walk_right_2.png"]);
gamejs.preload(["images/police/police_violence_left_1.png"]);
gamejs.preload(["images/police/police_violence_left_2.png"]);
gamejs.preload(["images/police/police_violence_left_3.png"]);
gamejs.preload(["images/police/police_violence_right_1.png"]);
gamejs.preload(["images/police/police_violence_right_2.png"]);
gamejs.preload(["images/police/police_violence_right_3.png"]);

var Police = exports.Police = function(direction, leftmost, rightmost) {
    Police.superConstructor.apply(this, arguments);

    var self;
    this.animations = {};
    this.maxLeft = leftmost;
    this.maxRight = rightmost;
    
    this.animations.idleLeft = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/police/police_stand_left_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.animations.idleRight = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/police/police_stand_right_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.animations.walkLeft = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/police/police_walk_left_1.png", vx: -4, vy: 0},
		  {ticks: 4, image: "images/police/police_stand_left_1.png", vx: -4, vy: 0},
		  {ticks: 4, image: "images/police/police_walk_left_2.png", vx: -4, vy: 0},
		  {ticks: 4, image: "images/police/police_stand_left_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.animations.walkRight = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/police/police_walk_right_1.png", vx: 4, vy: 0},
		  {ticks: 4, image: "images/police/police_stand_right_1.png", vx: 4, vy: 0},
		  {ticks: 4, image: "images/police/police_walk_right_2.png", vx: 4, vy: 0},
		  {ticks: 4, image: "images/police/police_stand_right_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.animations.swingLeft = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 1, image: "images/police/police_stand_left_1.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_left_1.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_left_2.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_left_3.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_left_2.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_left_2.png", vx: 0, vy: 0},
		  {ticks: 1, image: "images/police/police_stand_left_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.animations.swingRight = new spriteanimation.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 1, image: "images/police/police_stand_right_1.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_right_1.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_right_2.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_right_3.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_right_2.png", vx: 0, vy: 0},
		  {ticks: 2, image: "images/police/police_violence_right_2.png", vx: 0, vy: 0},
		  {ticks: 1, image: "images/police/police_stand_right_1.png", vx: 0, vy: 0}
	     ]
	 }
    );
    this.startAnimation(this.animations.idleRight, false);
    
    return this;
};
gamejs.utils.objects.extend(Police, spriteanimation.AnimatedSprite);

Police.prototype.update = function(msduration, context) {
    var WALK_DISTANCE = 12;
    if (!this.lastAnim) this.lastAnim = 1; // user this variable to keep track of last animation run
    
    if (this.isAnimationFinished()) {
	 var num = Math.ceil(Math.random()*8);
	 if (num > 6) {
	     num = this.lastAnim;
	 }
	 this.startAnimation(this.animations.idleLeft, false); // clear animation
	 switch (num) {
	 case 1:
	     if (this.position[0] - WALK_DISTANCE > this.maxLeft) {
		  this.startAnimation(this.animations.idleLeft, false);
		  this.lastAnim = num;
	     }
	     break;
	 case 2:
	     if (this.position[0] + WALK_DISTANCE < this.maxRight) {
		  this.startAnimation(this.animations.idleRight, false);
		  this.lastAnim = num;
	     }
	     break;
	 case 3:
	     this.startAnimation(this.animations.walkLeft, false);
	     this.lastAnim = num;
	     break;
	 case 4:
	     this.startAnimation(this.animations.walkRight, false);
	     this.lastAnim = num;
	     break;
	 case 5:
	     this.startAnimation(this.animations.swingLeft, false);
	     this.lastAnim = num;
	     break;
	 case 6:
	     this.startAnimation(this.animations.swingRight, false);
	     this.lastAnim = num;
	     break;
	 }
    }

    Police.superClass.update.apply(this, arguments);
};
