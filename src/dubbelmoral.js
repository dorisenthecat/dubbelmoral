var gamejs = require('gamejs');

var nilen = require('./room/nilen');

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

function main() {
    var display = gamejs.display.setMode([326, 185]);
    var currentRoom = new nilen.Nilen();
    
    currentRoom.draw(display);
};

gamejs.ready(function() {
    main();
});
