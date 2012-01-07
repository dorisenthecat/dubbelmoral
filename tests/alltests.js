var gamejs = require("gamejs");

QUnit.stop();

require("tests/animationtest").run;
require("tests/roomtest").run;
require("tests/studenttest").run;

gamejs.ready(function() {
    QUnit.start();
});
