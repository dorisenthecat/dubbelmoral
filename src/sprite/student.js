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

    this.animations = {};
    var self = this;

	this.akwardMovement = function () {
		var factor = self.running ? 2: 1;
		if(Math.random() < (self.score.drunkness - 50) / 50 * factor) {
     		self.hit();
     	}
	}

    var walkLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_1.png", vx: -7},
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -7},
		  {ticks: 2, image: "images/student/student_walk_left_2.png", vx: -7}
	     ],
	     begin: function(cursor) { 
	     		self.walking = true; 
	     		self.akwardMovement();
	     	},
	     end : function(cursor) { self.walking = false; },
	     interrupt: function(cursor) { self.walking = false; }
	 }
    );
    
    var runRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 14},
		  {ticks: 2, image: "images/student/student_walk_right_1.png", vx: 14},
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 14},
		  {ticks: 2, image: "images/student/student_walk_right_2.png", vx: 14}
	     ],
	     begin: function(cursor) {
	     	self.running = true;
	     	self.akwardMovement();
	     	if(self.score.drunkness > 15) {
	     		self.score.peeiness += 2;
	    	}
	     },
	     end: function(cursor) { self.running = false; },
	     interrupt: function(cursor) { self.running = false; }
	 }
    );

    var runLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -14},
		  {ticks: 2, image: "images/student/student_walk_left_1.png", vx: -14},
		  {ticks: 2, image: "images/student/student_stand_left.png", vx: -14},
		  {ticks: 2, image: "images/student/student_walk_left_2.png", vx: -14}
	     ],
	     begin: function(cursor) { 
	     	self.running = true; 
	     	self.akwardMovement();
	     	if(self.score.drunkness > 15) {
	     		self.score.peeiness += 2;
	     	}
	     },
	     end : function(cursor) { self.running = false; },
	     interrupt: function(cursor) { self.running = false; }
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
	     begin: function(cursor) { self.walking = true; self.akwardMovement(); },
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
	     begin: function(cursor) { self.drinking = true; self.busy = true;},
	     end: function(cursor) {
	     		self.drinking = false;
	     		self.busy = false;
	     		self.score.drunkness += 10;
	     		self.score.peeiness += 2;
	     		self.score.badScore += 15;
	     		self.standIdle();
	     	},
	     interrupt: function(cursor) { self.drinking = false; self.busy = false; }
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
	     begin: function(cursor) { self.drinking = true; self.busy = true; },
	     end: function(cursor) { self.drinking = false; self.busy = false; self.score.drunkness += 10; self.score.badScore += 5; self.standIdle(); },
	     interrupt: function(cursor) { self.drinking = false; self.busy = false; }
	 }
    );

    var tripLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "left",
	     frames: [
		  {ticks: 4, image: "images/student/student_trip_left_1.png", vx: -7},
		  {ticks: 4, image: "images/student/student_trip_left_2.png", vx: -7}
	     ],
	     begin: function(cursor) { self.tripping = true; self.busy = true; },
	     end: function(cursor) { self.tripping = false; self.busy = false; self.score.damage += 10; self.standIdle(); },
	     interrupt: function(cursor) { self.tripping = false; self.busy = false; }
	 });
    
    var tripRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     direction: "right",
	     frames: [
		  {ticks: 4, image: "images/student/student_trip_right_1.png", vx: 7},
		  {ticks: 4, image: "images/student/student_trip_right_2.png", vx: 7}
	     ],
	     begin: function(cursor) { self.tripping = true; self.busy = true; },
	     end: function(cursor) { self.tripping = false; self.busy = false; self.score.damage += 10; self.standIdle(); },
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
	     end: function(cursor) { self.landing = false; self.busy = false; self.standIdle(); },
	     interrupt: function(cursor) { self.landing = false; self.busy = false; }
	 });
    this.animations.climbUpAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/student/student_climb_1.png", vy: -4},
		  {ticks: 4, image: "images/student/student_climb_2.png", vy: -4}
	     ],
	     begin: function(cursor) { self.climbing = true; },
	     end: function(cursor) { self.climbing = false; },
	     interrupt: function(cursor) { self.climbing = false; }
	 });
    this.animations.climbDownAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, image: "images/student/student_climb_1.png", vy: 4},
		  {ticks: 4, image: "images/student/student_climb_2.png", vy: 4}
	     ],
	     begin: function(cursor) { self.climbing = true; },
	     end: function(cursor) { self.climbing = false; },
	     interrupt: function(cursor) { self.climbing = false; }
	 });
    this.animations.climbIdleAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 4, ximage: "images/student/student_climb_1.png", vy: 0},
		  {ticks: 4, ximage: "images/student/student_climb_2.png", vy: 0}
	     ],
	     begin: function(cursor) { self.climbing = true; },
	     end: function(cursor) { self.climbing = false; },
	     interrupt: function(cursor) { self.climbing = false; }
	 });
    
    this.startAnimation(standRightAnimation, true);

    this.walk = function(dir) {
	 if (!this.busy) {
	     if (dir === animatedsprite.DIR_LEFT) {
		  this.startAnimation(walkLeftAnimation, true);
	     } else if (dir === animatedsprite.DIR_RIGHT) {
		  this.startAnimation(walkRightAnimation, true);
	     }
	 }
    };
    this.run = function(dir) {
	 if (!this.busy) {
	     if (dir === animatedsprite.DIR_LEFT) {
		  this.startAnimation(runLeftAnimation, true);
	     } else if (dir === animatedsprite.DIR_RIGHT) {
		  this.startAnimation(runRightAnimation, true);
	     }
	 }
    };
    this.climb = function(dir) {
	 if (!this.busy) {
	     this.climbing = true;
	     this.climbdirection = dir;
	 }
    };
    this.standIdle = function() {
    	if (!this.busy) {
		 this.climbdirection = "";
		 if (this.climbing) {
		     this.startAnimation(this.animations.climbIdleAnimation, true);
		 } else if (this.direction === animatedsprite.DIR_LEFT) {
		     this.startAnimation(standLeftAnimation, true);
		 } else {
		     this.startAnimation(standRightAnimation, true);
		 }
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
	 if (!this.busy) {
	     this.standIdle();
	     this.shouldActivate = true;
	 }
    };
    this.drink = function() {
	 if (this.direction === animatedsprite.DIR_LEFT) {
	     this.startAnimation(drinkLeftAnimation, false);
	 } else {
	     this.startAnimation(drinkRightAnimation, false);
	 }
    };
    this.hit = function() {
	 this.standIdle();
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

    this.updateRect();

    return this;
};
gamejs.utils.objects.extend(Student, animatedsprite.AnimatedSprite);

Student.prototype.isOnLadder = function(room) {
    var self = this;
    return room.ladders.some(function (ladder) {
				     return ladder.rect.collidePoint(self.position);
				 });
};

Student.prototype.soberUp = function() {
	if (!this.soberCounter) {
		this.soberCounter = 0;
	}
	if (this.soberCounter === 0) {
		if (this.score.drunkness > 0) {
			this.score.drunkness -= 2;
			this.score.badScore += 1;
			this.score.peeiness += 1;
		}
	}
	
	if (this.score.drunkness < 0) {
		this.score.drunkness = 0;
	}
	this.soberCounter = (this.soberCounter +1 ) % 20;
};

Student.prototype.update = function(msduration, context) {
    var self = this;

	this.soberUp();

    if (this.climbing) {
	 if (!this.isOnLadder(context.room)) {
	     this.climbing = false;
	 } else if (this.climbdirection === animatedsprite.DIR_UP) {
	     this.startAnimation(this.animations.climbUpAnimation, true);
	 } else if (this.climbdirection === animatedsprite.DIR_DOWN) {
	     this.startAnimation(this.animations.climbDownAnimation, true);
	 } else {
	     this.startAnimation(this.animations.climbIdleAnimation, true);
	 }
    };

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
    this.shouldActivate = false;

    Student.superClass.update.apply(this, arguments);

    self.updateRect();
};

Student.prototype.placeInRoom = function(room) {
    //update is called from main updateLoop
    room.drawables.add(this);
    room.portalwalkers.add(this);
};
