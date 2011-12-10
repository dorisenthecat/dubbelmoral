var gamejs = require('gamejs');

var nilen = require('./room/nilen');
var fontanen = require('./room/fontanen');
var akademiska = require('./room/akademiska');
var domkyrkan = require('./room/domkyrkan');

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

    var context = {
	 switchRoomLeft: function () {
	     switchToRoom((rooms.indexOf(currentRoom) - 1 + rooms.length) % rooms.length);
	 },
	 switchRoomRight: function() {
	     switchToRoom((rooms.indexOf(currentRoom) + 1) % rooms.length);
	 }
    };

    var display = gamejs.display.setMode([326, 185]);
    var mapDisplay = gamejs.display.setMode([148,298], "map");
    var hemmaDisplay = gamejs.display.setMode([326, 64], "hemma");
    
	var student = new Student([100,185-2]);

	var rooms = [];
	rooms.push(new nilen.Nilen());
	rooms.push(new fontanen.Fontanen());
    rooms.push(new akademiska.Akademiska());
    rooms.push(new domkyrkan.Domkyrkan());

	
    var currentRoom;
    var map = new Map();

	switchToRoom(0);

    var tick = function(msduration) {
	 currentRoom.update(msduration, context);
	 map.update(msduration);
	 student.update(msduration);
	 
	 hemmaDisplay.blit(gamejs.image.load("images/hemma.png"));
	 map.draw(mapDisplay);
	 currentRoom.draw(display);
    };

    gamejs.time.fpsCallback(tick, this, 10);
	function switchToRoom(index) {
		var nextRoom = rooms[index];
		if (nextRoom !== currentRoom) {
			currentRoom = nextRoom;
			nextRoom.init();
			nextRoom.drawables.add(student);
  		       nextRoom.portalwalkers.add(student);
		}
	};
};

gamejs.ready(function() {
    main();
});