var gamejs = require("gamejs");
var spriteanimation = require("./animatedsprite");

gamejs.preload(["images/branch/branch_right_1.png"]);
gamejs.preload(["images/branch/branch_right_2.png"]);
gamejs.preload(["images/branch/branch_right_3.png"]);

var Branch = exports.Branch = function() {
    Branch.superConstructor.apply(this, arguments);
    var standAnimation = new spriteanimation.SpriteAnimation(
      {
        frames: [
        {ticks: 1, image: "images/branch/branch_right_1.png", vy: 5},
        {ticks: 1, image: "images/branch/branch_right_2.png", vy: 5},
        {ticks: 1, image: "images/branch/branch_right_3.png", vy: 5},   
        ]
      }
    );
    
    var self = this;
    standAnimation.start(this, function(anim) {
      self.restartAnimation();
    });
    return this;
};
gamejs.utils.objects.extend(Branch, spriteanimation.AnimatedSprite);

Branch.prototype.update = function(msduration, context) {
    Branch.superClass.update.apply(this, arguments);

    var hitStudent = false;
    
    var self = this;
    if (gamejs.sprite.collideRect(this, context.student)) {
       hitStudent = true;
       //TODO: set animation
    }

    if(this.rect.top > 185 || hitStudent) {
      this.rect.bottom = 0;
      this.updatePosition();
    }
    
};
