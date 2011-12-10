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

var Student = exports.Student = function() {
    Student.superConstructor.apply(this, arguments);

//    this.shouldMoveSprite = false;
    
    var standAnimation = new animatedsprite.SpriteAnimation(
	 {
	     frames: [
		  {ticks: 5, image: "images/student/student_stand_right.png", vx: 0},
		  {ticks: 5, image: "images/student/student_walk_right_1.png", vx: 5},
		  {ticks: 5, image: "images/student/student_stand_right.png", vx: 5},
		  {ticks: 5, image: "images/student/student_walk_right_2.png", vx: 5}
	     ]
	 }
    );
    
    var self = this;
    standAnimation.start(this, function(anim) {
				 self.restartAnimation();
			    });

    return this;
};
gamejs.utils.objects.extend(Student, animatedsprite.AnimatedSprite);

Student.prototype.update = function(msduration) {
    Student.superClass.update.apply(this, arguments);
    //fysik och knappar och drit
};