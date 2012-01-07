var gamejs = require("gamejs");
var animatedsprite = require("./animatedsprite");
var Room = require("../room/room").Room;
var Score = require("../score").Score;

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
gamejs.preload(["images/student/student_climb_1.png"]);
gamejs.preload(["images/student/student_climb_2.png"]);

var Student = exports.Student = function() {
    Student.superConstructor.apply(this, arguments);

    this.score = new Score();

    //state variables
    this.busy = false;
    this.idle = true;
    this.walking = false;
    this.ducking = false;
    this.falling = false;
    this.drinking = false;
    this.trippping = false;
    this.climbing = false;
    this.landing = false;

    this.running = false;

    this.vommiting = false;

    this.shouldActivate = false;

    var self = this;

    var walkLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_1.png", vx: -7},
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_2.png", vx: -7}
	     ],
	     begin: function(cursor) { self.walking = true; },
	     end : function(cursor) { self.walking = false; },
	     interrupt: function(cursor) { self.walking = false; }
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
	     ],
	     begin: function(cursor) { self.walking = true; },
	     end: function(cursor) { self.walking = false; },
	     interrupt: function(cursor) { self.walking = false; }
	 }
    );

    var standLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 1, image: "images/student/student_stand_left.png"}
	     ],
	     begin: function(cursor) { self.idle = true; },
	     end: function(cursor) { self.idle = false; },
	     interrupt: function(cursor) { self.idle = false; }
	 }
    );
    
    var standRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 1, image: "images/student/student_stand_right.png"}
	     ],
	     begin: function(cursor) { self.idle = true; },
	     end: function(cursor) { self.idle = false; },
	     interrupt: function(cursor) { self.idle = false; }
	 }
    );
    
    var duckLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 1, image: "images/student/student_duck_left.png"}
	     ],
	     begin: function(cursor) { self.ducking = true; },
	     end: function(cursor) { self.ducking = false; },
	     interrupt: function(cursor) { self.ducking = false; }
	 }
    );

    var duckRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 1, image: "images/student/student_duck_right.png"}
	     ],
	     begin: function(cursor) { self.ducking = true; },
	     end: function(cursor) { self.ducking = false; },
	     interrupt: function(cursor) { self.ducking = false; }
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
	     ],
	     begin: function(cursor) { self.drinking = true; },
	     end: function(cursor) { self.drinking = false; self.score.drunkness += 10; self.score.badScore += 5;},
	     interrupt: function(cursor) { self.drinking = false; }
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
	     ],
	     begin: function(cursor) { self.drinking = true; },
	     end: function(cursor) { self.drinking = false; self.score.drunkness += 10; self.score.badScore += 5;},
	     interrupt: function(cursor) { self.drinking = false; }
	 }
    );

    var tripLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 4, image: "images/student/student_trip_left_1.png", vx: -7},
		  {ticks: 4, image: "images/student/student_trip_left_2.png", vx: -7},
		  {ticks: 1, image: "images/student/student_stand_left.png"}
	     ],
	     begin: function(cursor) { self.tripping = true; self.busy = true; },
	     end: function(cursor) { self.tripping = false; self.busy = false; self.score.damage += 10; },
	     interrupt: function(cursor) { self.tripping = false; self.busy = false; }
	 });
    
    var tripRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 4, image: "images/student/student_trip_right_1.png", vx: 7},
		  {ticks: 4, image: "images/student/student_trip_right_2.png", vx: 7},
		  {ticks: 1, image: "images/student/student_stand_right.png"}
	     ],
	     begin: function(cursor) { self.tripping = true; self.busy = true; },
	     end: function(cursor) { self.tripping = false; self.busy = false; self.score.damage += 10; },
	     interrupt: function(cursor) { self.tripping = false; self.busy = false; }
	 });

    var fallAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 2, image: "images/student/student_fall_1.png", vy: 7},
		  {ticks: 2, image: "images/student/student_fall_2.png", vy: 7}
	     ],
	     begin: function(cursor) { self.falling = true; self.busy = true; },
	     end: function(cursor) { self.falling = false; self.busy = false; },
	     interrupt: function(cursor) { self.falling = false; self.busy = false; }
	 });

    var landAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/student/student_land_1.png"}
	     ],
	     begin: function(cursor) { self.landing = true; self.busy = true; self.score.damage += 30; },
	     end: function(cursor) { self.landing = false; self.busy = false; },
	     interrupt: function(cursor) { self.landing = false; self.busy = false; }
	 });
    
    this.startAnimation(standRightAnimation, true);

    this.left = function() {
	 if (!this.busy) {
	     this.startAnimation(walkLeftAnimation, true);
	 }
    };
    this.right = function() {
	 if (!this.busy) {
	     this.startAnimation(walkRightAnimation, true);
	 }
    };
    this.stop = function() {
	 if (this.direction === animatedsprite.DIR_LEFT) {
	     this.startAnimation(standLeftAnimation, false);
	 } else {
	     this.startAnimation(standRightAnimation, false);
	 }
    };
    this.duck = function() {
	 if (!this.busy) {
	     if (this.direction === animatedsprite.DIR_LEFT) {
		  this.startAnimation(duckLeftAnimation, true);
	     } else {
		  this.startAnimation(duckRightAnimation, true);
	     }
	 }
    };
    this.activate = function() {
//	 if (this.idle) {
	     this.stop();
	     this.shouldActivate = true;
	 //}
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
	 if (this.position[1] > 3 && (this.jumping || this.climbing)) {
	     this.fall();
	 } else {
	     if (this.direction === animatedsprite.DIR_LEFT) {
		  this.startAnimation(tripLeftAnimation, false);
	     } else {
		  this.startAnimation(tripRightAnimation, false);
	     }
	 }
    };
    this.fall = function() {
	 if (this.position[1] >= Room.prototype.FLOOR_LEVEL) { // TODO: change this to floor level of room
	     this.land(Room.prototype.FLOOR_LEVEL);
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
    this.up = function() {
	 this.shouldClimbUp = true;
    };
    this.down = function() {
	 if (!this.climbing || this.position[1] === Room.prototype.FLOOR_LEVEL) {
	     this.duck();
	 } else if (this.climbing) {
	     //climb down if possible
	     this.shouldclimbDown = true;
	 }
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
	 if (this.position[1] < Room.prototype.FLOOR_LEVEL || this.falling) {
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
	     gamejs.sprite.spriteCollide(this, context.room.activateables, false).forEach(
		  function (activatable) {
		      if (done) return;
		      if (activatable.activateMe) {
			   done = activatable.activateMe.apply(activatable, [context]);
		      }
		  });
	 }
    }
    
    this.shouldClimbUp = false;
    this.shouldClimbDown = false;


    this.shouldActivate = false;
    self.updateRect();
};

Student.prototype.placeInRoom = function(room) {
    //update is called from main updateLoop
    room.drawables.add(this);
    room.portalwalkers.add(this);
};
