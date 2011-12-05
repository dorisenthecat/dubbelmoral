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

gamejs.preload(["images/map.png"]);
gamejs.preload(["images/hemma.png"]);

function main() {
    var display = gamejs.display.setMode([326, 185]);
    var currentRoom = new nilen.Nilen();
    
    var mapDisplay = gamejs.display.setMode([148,299], "map");
    mapDisplay.blit(gamejs.image.load("images/map.png"));
    
    var hemmaDisplay = gamejs.display.setMode([326, 64], "hemma");
    hemmaDisplay.blit(gamejs.image.load("images/hemma.png"));
    
    currentRoom.draw(display);
};

gamejs.ready(function() {
    main();
});
