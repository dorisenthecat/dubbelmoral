var gamejs = require("gamejs");
var Room = require("../src/room/room").Room;
var BaseSprite = require("../src/sprite/basesprite").BaseSprite;

qModule('Room');

test("Basics", function() {
    var r = new Room();
    
    var drawn = false;
    var updated = false;
    
    var sprite = new BaseSprite(new gamejs.Rect([100, 100, 10, 10]));
    sprite.draw = function() { drawn = true; };
    sprite.update = function() { updated = true; };
    
    r.updateables.add(sprite);
    r.drawables.add(sprite);
    
    r.update();
    ok(updated, "Sprites are updated");
    
    r.draw();
    ok(drawn, "Sprites are drawn");
    
    r.init();
});
