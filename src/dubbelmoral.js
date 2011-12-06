var gamejs = require('gamejs');

var nilen = require('./room/nilen');
var Map = require("./map").Map;

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
    var mapDisplay = gamejs.display.setMode([148,299], "map");
    var hemmaDisplay = gamejs.display.setMode([326, 64], "hemma");
    
    var currentRoom = new nilen.Nilen();
    var map = new Map();
    
    hemmaDisplay.blit(gamejs.image.load("images/hemma.png"));
    map.draw(mapDisplay);
    currentRoom.draw(display);
};

gamejs.ready(function() {
    main();
});
