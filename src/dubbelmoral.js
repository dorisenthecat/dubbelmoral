var gamejs = require('gamejs');

var Room = require("./room/room").Room;
var nilen = require('./room/nilen');
var fontanen = require('./room/fontanen');
var akademiska = require('./room/akademiska');
var domkyrkan = require('./room/domkyrkan');

var Map = require("./map").Map;

var animation = require("./animation");
var Student = require("./sprite/student").Student;

var spriteanimation = require("./sprite/animatedsprite");

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
	 },
	 student: null,
	 score: null,
	 room: null
    };

    var display = gamejs.display.setMode([326, 185]);
    var mapDisplay = gamejs.display.setMode([148,298], "map");
    var hemmaDisplay = gamejs.display.setMode([326, 64], "hemma");
    
	var student = new Student([265, Room.prototype.FLOOR_LEVEL]);
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
			   student.climb(spriteanimation.DIR_UP);
		      }
		      if (event.key === gamejs.event.K_LEFT) {
			   student.walk(spriteanimation.DIR_LEFT);
		      }
		      if (event.key === gamejs.event.K_RIGHT) {
			   student.walk(spriteanimation.DIR_RIGHT);
		      }
		      if (event.key === gamejs.event.K_SPACE) {
			   student.activate();
		      }
		      if (event.key === gamejs.event.K_DOWN) {
//			   student.duck();
			   student.climb(spriteanimation.DIR_DOWN);
		      }
		      if (event.key === gamejs.event.K_KP4) {
			   student.run(spriteanimation.DIR_LEFT);
		      }
		      if (event.key === gamejs.event.K_KP6) {
			   student.run(spriteanimation.DIR_RIGHT);
		      }
		  }
		  if (event.type === gamejs.event.KEY_UP) {
		      if ((event.key === gamejs.event.K_LEFT) ||
			   (event.key === gamejs.event.K_RIGHT) ||
			   (event.key === gamejs.event.K_UP) ||
			   (event.key === gamejs.event.K_DOWN) ||
			   (event.key === gamejs.event.K_KP4) ||
			   (event.key === gamejs.event.K_KP6)
			  ) {
			   student.standIdle();
		      }
		      if (event.key === gamejs.event.K_d) {
			   student.toggleDebug(); //any sprite will do
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
	 map.draw(mapDisplay, student.score);
	 currentRoom.draw(display);
    };

    gamejs.time.fpsCallback(tick, this, 10);
	function switchToRoom(index) {
		var nextRoom = rooms[index];
		if (nextRoom !== currentRoom) {
			currentRoom = nextRoom;
			nextRoom.init();
		       student.placeInRoom(nextRoom);
		    context.room = nextRoom;
		}
	};
};

gamejs.ready(function() {
    main();
});