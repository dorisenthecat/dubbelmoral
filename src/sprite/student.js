var gamejs = require("gamejs");
var animatedsprite = require("./animatedsprite");

/*
 * Student
 * 
 * Members
 *  score (Score)
 *  currentRoom (Room)
 * 
 * Methods
 *  udpate(msduration)
 */

gamejs.preload(["images/student/student_stand_right.png"]);
gamejs.preload(["images/student/student_walk_right_1.png"]);
gamejs.preload(["images/student/student_walk_right_2.png"]);
gamejs.preload(["images/student/student_stand_left.png"]);
gamejs.preload(["images/student/student_walk_left_1.png"]);
gamejs.preload(["images/student/student_walk_left_2.png"]);
gamejs.preload(["images/student/student_duck_right.png"]);
gamejs.preload(["images/student/student_duck_left.png"]);
gamejs.preload(["images/student/student_drink_left_1.png"]);
gamejs.preload(["images/student/student_drink_left_2.png"]);
gamejs.preload(["images/student/student_drink_left_3.png"]);
gamejs.preload(["images/student/student_drink_left_4.png"]);
gamejs.preload(["images/student/student_drink_left_5.png"]);
gamejs.preload(["images/student/student_drink_left_6.png"]);
gamejs.preload(["images/student/student_drink_left_7.png"]);
gamejs.preload(["images/student/student_drink_left_8.png"]);
gamejs.preload(["images/student/student_drink_left_9.png"]);
gamejs.preload(["images/student/student_drink_right_1.png"]);
gamejs.preload(["images/student/student_drink_right_2.png"]);
gamejs.preload(["images/student/student_drink_right_3.png"]);
gamejs.preload(["images/student/student_drink_right_4.png"]);
gamejs.preload(["images/student/student_drink_right_5.png"]);
gamejs.preload(["images/student/student_drink_right_6.png"]);
gamejs.preload(["images/student/student_drink_right_7.png"]);
gamejs.preload(["images/student/student_drink_right_8.png"]);
gamejs.preload(["images/student/student_drink_right_9.png"]);
gamejs.preload(["images/student/student_trip_left_1.png"]);
gamejs.preload(["images/student/student_trip_left_2.png"]);
gamejs.preload(["images/student/student_trip_right_1.png"]);
gamejs.preload(["images/student/student_trip_right_2.png"]);
gamejs.preload(["images/student/student_fall_1.png"]);
gamejs.preload(["images/student/student_fall_2.png"]);
gamejs.preload(["images/student/student_land_1.png"]);

var Student = exports.Student = function() {
    Student.superConstructor.apply(this, arguments);

//    this.shouldMoveSprite = false;
    
    //state variables
    this.falling = false;
    this.shouldActivate = false;

    var walkLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_1.png", vx: -7},
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_2.png", vx: -7}
	     ]
	 }
    );
    
    var walkRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 7},
		  {ticks: 2, image: "images/student/student_walk_right_1.png", vx: 7},
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 7},
		  {ticks: 2, image: "images/student/student_walk_right_2.png", vx: 7}
	     ]
	 }
    );

    var standLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 1, image: "images/student/student_stand_left.png"}
		  ]
	 }
    );
    
    var standRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 1, image: "images/student/student_stand_right.png"}
		  ]
	 }
    );
    
    var duckLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 1, image: "images/student/student_duck_left.png"}
	     ]
	 }
    );

    var duckRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 1, image: "images/student/student_duck_right.png"}
	     ]
	 }
    );

    var drinkLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 1, image: "images/student/student_drink_left_1.png"},
		  {ticks: 1, image: "images/student/student_drink_left_2.png"},
		  {ticks: 1, image: "images/student/student_drink_left_3.png"},
		  {ticks: 1, image: "images/student/student_drink_left_4.png"},
		  {ticks: 1, image: "images/student/student_drink_left_5.png"},
		  {ticks: 1, image: "images/student/student_drink_left_6.png"},
		  {ticks: 1, image: "images/student/student_drink_left_7.png"},
		  {ticks: 1, image: "images/student/student_drink_left_8.png"},
		  {ticks: 1, image: "images/student/student_drink_left_9.png"}
	     ]
	 }
    );

    var drinkRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 1, image: "images/student/student_drink_right_1.png"},
		  {ticks: 1, image: "images/student/student_drink_right_2.png"},
		  {ticks: 1, image: "images/student/student_drink_right_3.png"},
		  {ticks: 1, image: "images/student/student_drink_right_4.png"},
		  {ticks: 1, image: "images/student/student_drink_right_5.png"},
		  {ticks: 1, image: "images/student/student_drink_right_6.png"},
		  {ticks: 1, image: "images/student/student_drink_right_7.png"},
		  {ticks: 1, image: "images/student/student_drink_right_8.png"},
		  {ticks: 1, image: "images/student/student_drink_right_9.png"}
	     ]
	 }
    );

    var tripLeftAnimation = new animatedsprite.SpriteAnimation({
	 direction: "left",
	 frames: [
	     {ticks: 4, image: "images/student/student_trip_left_1.png", vx: -7},
	     {ticks: 4, image: "images/student/student_trip_left_2.png", vx: -7},
	     {ticks: 1, image: "images/student/student_stand_left.png"}
	 ]});

    var tripRightAnimation = new animatedsprite.SpriteAnimation({
	 direction: "right",
	 frames: [
	     {ticks: 4, image: "images/student/student_trip_right_1.png", vx: 7},
	     {ticks: 4, image: "images/student/student_trip_right_2.png", vx: 7},
	     {ticks: 1, image: "images/student/student_stand_right.png"}
	 ]});

    var fallAnimation = new animatedsprite.SpriteAnimation({
	 frames: [
	     {ticks: 2, image: "images/student/student_fall_1.png", vy: 7},
	     {ticks: 2, image: "images/student/student_fall_2.png", vy: 7},
	 ]});

    var landAnimation = new animatedsprite.SpriteAnimation({
	 frames: [
	     {ticks: 4, image: "images/student/student_land_1.png"}
	 ]});
    
    this.startAnimation(standRightAnimation, true);

    this.left = function() {
	 this.startAnimation(walkLeftAnimation, true);
    };
    this.right = function() {
	 this.startAnimation(walkRightAnimation, true);
    };
    this.stop = function() {
	 if (this.direction === animatedsprite.DIR_LEFT) {
	     this.startAnimation(standLeftAnimation, false);
	 } else {
	     this.startAnimation(standRightAnimation, false);
	 }
    };
    this.duck = function() {
	 if (this.direction === animatedsprite.DIR_LEFT) {
	     this.startAnimation(duckLeftAnimation, true);
	 } else {
	     this.startAnimation(duckRightAnimation, true);
	 }
    };
    this.activate = function() {
	 this.stop();
	 this.shouldActivate = true;
    };
    this.drink = function() {
	 if (this.direction === animatedsprite.DIR_LEFT) {
	     this.startAnimation(drinkLeftAnimation, false);
	 } else {
	     this.startAnimation(drinkRightAnimation, false);
	 }
    };
    this.hit = function() {
	 this.stop();
//	 if (this.position[1] > 3) {
	     //should fall down, i.e. is on ladder or on platform
//	 } else {
	     if (this.direction === animatedsprite.DIR_LEFT) {
		  this.startAnimation(tripLeftAnimation, false);
	     } else {
		  this.startAnimation(tripRightAnimation, false);
	     }
//	 }
    };
    this.fall = function() {
	 if (this.position[1] >= 185-2) { // TODO: change this to floor level of room
	     this.land(185-2);
	 } else {
	     this.falling = true;
	     this.startAnimation(fallAnimation, true);
	 }
    };
    this.land = function(floor) {
	 this.falling = false;
	 this.position[1] = floor;
	 this.updateRect();
	 this.startAnimation(landAnimation, false);
    };
    
    this.updateRect();

    return this;
};
gamejs.utils.objects.extend(Student, animatedsprite.AnimatedSprite);

Student.prototype.update = function(msduration, context) {
    Student.superClass.update.apply(this, arguments);
    //fysik och knappar och drit
    
    var self = this;
    
    this.climbing = false;
    if (!this.climbing) {
	 if (this.position[1] < 185-2 || this.falling) {
	     if (!context.room.platforms.sprites().some(
		  function (platform) {
		      if (platform.rect.collideLine(self.position, [self.old_x, self.old_y])) {
			   if (self.falling) {
				self.land(platform.rect.top);
			   }
			   return true;
		      }
		      return false;
		  })) {
		  this.fall();
	     }
	 }
    }

    if (this.shouldActivate) {
	 if (context && context.room) {
	     var done = false;
	     var self = this;
	     gamejs.sprite.spriteCollide(this, context.room.activateables, false).forEach(
		  function (activatable) {
		      if (done) return;
		      if (activatable.activateMe) {
			   done = activatable.activateMe.apply(activatable, [context]);
		      }
		  });
	 }
    }

    this.shouldActivate = false;
    self.updateRect();
};