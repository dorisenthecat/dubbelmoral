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
    context.student = student;

	var rooms = [];
	rooms.push(new nilen.Nilen());
	rooms.push(new fontanen.Fontanen());
    rooms.push(new akademiska.Akademiska());
    rooms.push(new domkyrkan.Domkyrkan());

	
    var currentRoom;
    var map = new Map();

	switchToRoom(0);

    var handleEvents = function(events) {
	 events.forEach(
	     function(event) {
		  if (event.type === gamejs.event.KEY_DOWN) {
		      if (event.key === gamejs.event.K_UP) {
			   
		      }
		      if (event.key === gamejs.event.K_LEFT) {
			   student.left();
		      }
		      if (event.key === gamejs.event.K_RIGHT) {
			   student.right();
		      }
		      if (event.key === gamejs.event.K_SPACE) {
			   student.activate();
		      }
		      if (event.key === gamejs.event.K_DOWN) {
			   student.duck();
		      }
		  }
		  if (event.type === gamejs.event.KEY_UP) {
		      if ((event.key === gamejs.event.K_LEFT) ||
			   (event.key === gamejs.event.K_RIGHT) ||
			   (event.key === gamejs.event.K_DOWN)) {
			   student.stop();
		      }
		  };
		  if (event.type === gamejs.event.MOUSE_DOWN) {
		      console.log("mose down at (" + event.pos[0] + ", " + event.pos[1] + ")");
		  }
	     });
    };
    
    var tick = function(msduration) {
	 var events = gamejs.event.get();
	 handleEvents(events);

	 currentRoom.update(msduration, context);
	 map.update(msduration, currentRoom);
	 student.update(msduration, context);
	 
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
		    context.room = nextRoom;
		}
	};
};

gamejs.ready(function() {
    main();
});