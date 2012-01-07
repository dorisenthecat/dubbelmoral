var gamejs = require('gamejs');
var basesprite = require('./basesprite');
var spriteanimation = require("./animatedsprite");
gamejs.preload(["images/drunk/drunk_drinking_1.png"]);
gamejs.preload(["images/drunk/drunk_drinking_2.png"]);
gamejs.preload(["images/drunk/drunk_throwing_1.png"]);
gamejs.preload(["images/drunk/drunk_throwing_2.png"]);
gamejs.preload(["images/drunk/drunk_throwing_3.png"]);
gamejs.preload(["images/drunk/molotov.png"]);

var Molotov = function(rect, vx, vy, thrower) {
	Molotov.superConstructor.apply(this, arguments);

	this.thrower = thrower;
	thrower.molotovStillInAir = true;

	var self;
	var anim = new spriteanimation.SpriteAnimation(
		{
			frames: [
				{ticks: 1, image: "images/drunk/molotov.png", vx: vx, vy: vy}
			]
		}
	);
	this.startAnimation(anim, true);
	
	return this;
};
gamejs.utils.objects.extend(Molotov, spriteanimation.AnimatedSprite);

Molotov.prototype.update = function(msDuration, context) {
	Molotov.superClass.update.apply(this, arguments);

	if (!this.hitStudent && gamejs.sprite.collideRect(this, context.student)) {
		this.hitStudent = true;
		context.student.hit.apply(context.student);
		context.student.score.damage += 10;
	}

	if (this.rect.top > 185 || this.rect.left > 325) {
		this.thrower.molotovStillInAir = false;
		this.kill();
	}
};

var Drunk = exports.Drunk = function(rect) {
	Drunk.superConstructor.apply(this, arguments);

	this.rect = rect;
	this.updatePosition();

	var self = this;

	this.animations = {};
	this.animations.thinking = new spriteanimation.SpriteAnimation(
		{
			frames: [
				{ticks: 40, image: "images/drunk/drunk_drinking_1.png"}
			]
		}
	);
	this.animations.drinking = new spriteanimation.SpriteAnimation(
		{
			frames: [
				{ticks: 8, image: "images/drunk/drunk_drinking_2.png"}
			]
		}
	);
	this.animations.throwing = new spriteanimation.SpriteAnimation(
		{
			frames: [
				{ticks: 4, image: "images/drunk/drunk_throwing_1.png"},
				{ticks: 4, image: "images/drunk/drunk_throwing_2.png",
					end: function() {
						var m = new Molotov([85, 144], self.aimX, self.aimY, self);
						m.placeInRoom(self.room);
					}
				},
				{ticks: 4, image: "images/drunk/drunk_throwing_3.png"}
			]
		}
	);

	this.startAnimation(this.animations.thinking, false);

	return this;
};

gamejs.utils.objects.extend(Drunk, spriteanimation.AnimatedSprite);

Drunk.prototype.placeInRoom = function(room) {
	Drunk.superClass.placeInRoom.apply(this, arguments);
	this.room = room;
};

Drunk.prototype.update = function(msDuration, context) {
	Drunk.superClass.update.apply(this, arguments);

	if (this.isAnimationFinished()) {
		this.aimX = this.aimY = 0;
		if (context.student.position[0] > this.position[0] + 100) {
			if (context.student.position[1] > 177) {
				this.aimX = 5; this.aimY = 1;
			} else if (context.student.position[1] < 120) {
				this.aimX = 5; this.aimY = -2;
			} else {
				this.aimX = 5; this.aimY = 0;
			}
		}

		if (Math.random() > 0.33) {
			this.startAnimation(this.animations.thinking, false);
		} else if (Math.random() > 0.7 && !this.molotovStillInAir && (this.aimX || this.aimY)) {
			this.startAnimation(this.animations.throwing, false);
		} else {
			this.startAnimation(this.animations.drinking, false);
		}
	}
};
