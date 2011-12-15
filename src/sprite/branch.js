var gamejs = require("gamejs");
var spriteanimation = require("./animatedsprite");

gamejs.preload(["images/branch/branch_right_1.png"]);
gamejs.preload(["images/branch/branch_right_2.png"]);
gamejs.preload(["images/branch/branch_right_3.png"]);

var Branch = exports.Branch = function(rect, dropArea) {
    Branch.superConstructor.apply(this, arguments);
    
    this.dropArea = dropArea;
    this.hitStudent = false;
    
    var fallAnimation = new spriteanimation.SpriteAnimation(
      {
        frames: [
          {ticks: 1, image: "images/branch/branch_right_1.png", vy: 12},
          {ticks: 1, image: "images/branch/branch_right_2.png", vy: 12},
          {ticks: 1, image: "images/branch/branch_right_3.png", vy: 12},   
        ]
      }
    );
    
    var self = this;
    fallAnimation.start(this, function(anim) {
      self.restartAnimation();
    });
    
    this.drop();
    
    return this;
};
gamejs.utils.objects.extend(Branch, spriteanimation.AnimatedSprite);

Branch.prototype.update = function(msduration, context) {
    Branch.superClass.update.apply(this, arguments);

    var self = this;
    if (!this.hitStudent && gamejs.sprite.collideRect(this, context.student)) {
       this.hitStudent = true;
       context.student.hit.apply(context.student);
    }

    if(this.rect.top > 185) {
      this.drop();
    }
    
};

Branch.prototype.drop = function() {
  var dropAreaWidth = this.dropArea[1] - this.dropArea[0];
  this.rect.left = Math.floor(Math.random()*dropAreaWidth) + this.dropArea[0];
  this.rect.bottom = 0;
  this.updatePosition();
  this.hitStudent = false;
}
