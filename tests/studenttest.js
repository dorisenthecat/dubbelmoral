var gamejs = require("gamejs");
var Room = require("../src/room/room").Room;
var Platform = require("../src/sprite/platform").Platform;
var Student = require("../src/sprite/student").Student;
var spriteanimation = require("../src/sprite/animatedsprite");

qModule("Student");

test("Stand on floor", function() {
    var r = new Room();
    var s = new Student([100, Room.prototype.FLOOR_LEVEL]);
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    s.update(10, context);
    s.update(10, context);
    s.update(10, context);
    
    ok(s.position[1] === r.FLOOR_LEVEL);
});

test("Stand on platform", function() {
    var r = new Room();
    var s = new Student([100, 100]);
    var p = new Platform(new gamejs.Rect([0, 100, 200, 10]));
    s.placeInRoom(r);
    p.placeInRoom(r);
    var context = {room: r, student: s};
    
    s.update(10, context);

    ok(s.position[1] === 100, "Still standing on platform after one tick");

    s.update(10, context);

    ok(s.position[1] === 100, "Still standing on platform after two ticks");
});

test("Falls", function() {
    var r = new Room();
    var s = new Student([100,100]);	 
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    s.update(10, context);

    ok(s.falling, "Student falling property set");
    ok(s.position[1] > 100, "Student moved down after one tick");

    s.update(10, context);

    ok(s.position[1] > 100, "Student moved down after two ticks");
});

test("Lands on floor", function() {
    var r = new Room();
    var s = new Student([100,100]);
    var i;
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    var didFall = false, didLand = false;
    for (i = 0; i < 50; i++) {
	 s.update(10, context);
	 didFall = didFall || s.falling;
	 didLand = didLand || s.landing;
    };

    ok(didFall, "Student falling property was set");
    ok(didLand, "Student landing property was set");
    ok(!s.falling, "Student is no longer falling");
    ok(!s.landing, "Student is no longer landing");
    ok(s.idle, "Student is idle");
    ok(s.position[1] === r.FLOOR_LEVEL, "Student is at floor level");
});

test("Lands on platform", function() {
    var s = new Student([100,100]);
    var p = new Platform(new gamejs.Rect([0, 160, 200, 10]));
    var r = new Room();
    var i;
    s.placeInRoom(r);
    p.placeInRoom(r);
    var context = {room: r, student: s};
    
    var didFall = false, didLand = false;
    for (i = 0; i < 50; i++) {
	 s.update(10, context);
	 didFall = didFall || s.falling;
	 didLand = didLand || s.landing;
    };

    ok(didFall, "Student falling property was set");
    ok(didLand, "Student landing property was set");
    ok(!s.falling, "Student is no longer falling");
    ok(!s.landing, "Student is no longer landing");
    ok(s.idle, "Student is idle");
    ok(s.position[1] === p.rect.top, "Student is on platform");
});

test("drink", function() {
    var r = new Room();
    var s = new Student([100, r.FLOOR_LEVEL]);
    var i;
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    var didDrink = false;
    var wasDrunk = 0;
    s.drink();
    for (i = 0; i < 40; i++) {
	 s.update(10, context);
	 didDrink = didDrink || s.drinking;
	 wasDrunk = wasDrunk || (s.score.drunkness > 0);
    };

    ok(didDrink, "Student drinking property was set");
    ok(!s.drinking, "Student is no longer drinking");
    ok(s.idle, "Student is idle");
    ok(wasDrunk, "Student got drunk");
});

test("walk", function() {
    var r = new Room();
    var s = new Student([100, r.FLOOR_LEVEL]);
    var i;
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    var prevX = s.position[0];
    s.walk(spriteanimation.DIR_LEFT);
    for (i = 0; i < 10; i++) {
	 s.update(10, context);
    }

    ok(s.position[0] < prevX, "Moved left when walking left");
    
    s.standIdle();
    
    prevX = s.position[0];
    s.walk(spriteanimation.DIR_RIGHT);
    for (i = 0; i < 10; i++) {
	 s.update(10, context);
    }

    ok(s.position[0] > prevX, "Moved right when walking right");
});

test("run", function() {
    var r = new Room();
    var s = new Student([100, r.FLOOR_LEVEL]);
    var i;
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    var prevX = s.position[0];
    s.run(spriteanimation.DIR_LEFT);
    for (i = 0; i < 10; i++) {
	 s.update(10, context);
    }

    ok(s.position[0] < prevX, "Moved left when walking left");
    
    s.standIdle();
    
    prevX = s.position[0];
    s.run(spriteanimation.DIR_RIGHT);
    for (i = 0; i < 10; i++) {
	 s.update(10, context);
    }

    ok(s.position[0] > prevX, "Moved right when walking right");
});

test("soberUp", function() {
    var r = new Room();
    var s = new Student([100, r.FLOOR_LEVEL]);
    var i;
    s.placeInRoom(r);
    var context = {room: r, student: s};
    
    s.score.drunkness = 1;
    for (i = 0; i < 50; i++) {
	 s.update(10, context);
    }
    
    ok(s.score.drunkness === 0, "Student got sober");
    ok(s.score.peeiness > 0, "Student needs to pee");
});
