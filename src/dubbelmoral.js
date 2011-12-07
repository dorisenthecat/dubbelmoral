var gamejs = require('gamejs');

var nilen = require('./room/nilen');
var Map = require("./map").Map;

var animation = require("./animation");

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
    
    hemmaDisplay.blit(gamejs.image.load("images/hemma.png"));
    map.draw(mapDisplay);
    currentRoom.draw(display);
    
    var anim = new animation.Animation();
    var fr = new animation.AnimationFrame();
    fr.ticks = 2;
    anim.frames.push(fr);
    var cursor = anim.start(this, function () { console.log("animation completed"); });
    this.updateAnimation();
    cursor.updateAnimation();
};

gamejs.ready(function() {
    main();
});
