var gamejs = require("gamejs");

/*
 * Map
 * 
 * Members
 *  score (Score)
 * 
 * Methods
 *  update(msduration)
 *  draw(surface)
 */

gamejs.preload(["images/map.png"]);

var Map = exports.Map = function() {
    this.image = gamejs.image.load("images/map.png");
};

Map.prototype.draw = function(surface) {
    surface.blit(this.image);
    // TODO: draw room position
    // TODO: draw scores
};

Map.prototype.update = function(msduration) {
    // TODO: update blinking room position animation
};
