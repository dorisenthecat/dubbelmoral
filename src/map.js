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

var SCORE_METER_WIDTH = 95;
var SCORE_METER_HEIGHT = 7;

var Map = exports.Map = function() {
    this.image = gamejs.image.load("images/map.png");
    this.crossImage = gamejs.image.load("images/roomposition.png");
    this.scoreMeterImage = gamejs.image.load("images/scoremeter.png");
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
  
    this.getScoreRect = function (startX, startY, score) {
        var ScorePercentPixels = SCORE_METER_WIDTH/100;
        return new gamejs.Rect([startX + ScorePercentPixels * score, startY], [SCORE_METER_WIDTH - ScorePercentPixels * score, SCORE_METER_HEIGHT])
    }
    
    return this;
};

Map.prototype.draw = function(surface, score) {
    surface.blit(this.image);
    if (this.showCross) {
      surface.blit(this.crossImage, this.roomPosition);
    }
    
    //Draw full score meters
    surface.blit(this.scoreMeterImage, [50,177]);
    surface.blit(this.scoreMeterImage, [50,190]);
    surface.blit(this.scoreMeterImage, [50,203]);
    
    //Hide some 
    gamejs.draw.rect(surface, "#ffffff",  this.getScoreRect(50, 177, score.drunkness));
    gamejs.draw.rect(surface, "#ffffff",  this.getScoreRect(50, 190, score.peeiness));
    gamejs.draw.rect(surface, "#ffffff",  this.getScoreRect(50, 203, score.damage));
    
};

Map.prototype.update = function(msduration, currentRoom) {
    if (this.updateAnimation) {
      this.updateAnimation();
    }
    this.roomPosition = currentRoom.positionOnMap;
};
