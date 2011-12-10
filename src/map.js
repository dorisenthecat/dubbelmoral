var gamejs = require("gamejs");
var animation = require("./animation");

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
gamejs.preload(["images/scoremeter.png"]);
gamejs.preload(["images/roomposition.png"]);

var Map = exports.Map = function() {
    this.image = gamejs.image.load("images/map.png");
    this.crossImage = gamejs.image.load("images/roomposition.png");
    this.showCross = true;
    this.roomPosition = new gamejs.Rect([0,0], [5,5]);
    
    var crossAnimation = new animation.Animation();
    var frame = new animation.AnimationFrame();
    frame.ticks = 5;
    frame.begin = function (map) {
      map.showCross = !map.showCross; 
    };
    crossAnimation.frames.push(frame);
    var self = this;
    crossAnimation.start(self, function() { self.restartAnimation(); });
    
    return this;
};

Map.prototype.draw = function(surface) {
    surface.blit(this.image);
    if (this.showCross) {
      surface.blit(this.crossImage, this.roomPosition);
    }
    // TODO: draw scores
};

Map.prototype.update = function(msduration, currentRoom) {
    if (this.updateAnimation) {
      this.updateAnimation();
    }
    this.roomPosition = currentRoom.positionOnMap;
};
