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

var Student = exports.Student = function() {
    Student.superConstructor.apply(this, arguments);

//    this.shouldMoveSprite = false;

    var walkLeftAnimation = new animatedsprite.SpriteAnimation(
	 {
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
	     frames: [
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 7},
		  {ticks: 2, image: "images/student/student_walk_right_1.png", vx: 7},
		  {ticks: 2, image: "images/student/student_stand_right.png", vx: 7},
		  {ticks: 2, image: "images/student/student_walk_right_2.png", vx: 7}
	     ]
	 }
    );
    
    var standRightAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 1, image: "images/student/student_stand_right.png"}
		  ]
	 }
    );
    
    this.startAnimation(standRightAnimation, true);

    this.left = function() {
	 this.startAnimation(walkLeftAnimation, true);
    };
    this.right = function() {
	 this.startAnimation(walkRightAnimation, true);
    };
    this.stop = function() {
	 this.startAnimation(standRightAnimation, false);
    };
    
    this.updateRect();

    return this;
};
gamejs.utils.objects.extend(Student, animatedsprite.AnimatedSprite);

Student.prototype.update = function(msduration) {
    Student.superClass.update.apply(this, arguments);
    //fysik och knappar och drit
};