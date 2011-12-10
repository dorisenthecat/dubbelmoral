var gamejs = require('gamejs');

var nilen = require('./room/nilen');
var Map = require("./map").Map;

var animation = require("./animation");
var Student = require("./sprite/student").Student;

/*
 * Game
 * 
 * Methods
 *  draw(surface)
 *  update(msduration) 
 * 
 * Members
 *  rooms (Array of Room)
 *  currentRoom (Room)
 *  score (Score)
 *  map (Map)
 */

gamejs.preload(["images/hemma.png"]);

function main() {
    var display = gamejs.display.setMode([326, 185]);
    var mapDisplay = gamejs.display.setMode([148,298], "map");
    var hemmaDisplay = gamejs.display.setMode([326, 64], "hemma");
    
    var currentRoom = new nilen.Nilen();
    var map = new Map();

    var student = new Student([100,185-2]);
    currentRoom.drawables.add(student);

    var tick = function(msduration) {
	 currentRoom.update(msduration);
	 map.update(msduration);
	 student.update(msduration);
	 
	 hemmaDisplay.blit(gamejs.image.load("images/hemma.png"));
	 map.draw(mapDisplay);
	 currentRoom.draw(display);
    };
    
    gamejs.time.fpsCallback(tick, this, 10);
};

gamejs.ready(function() {
    main();
});