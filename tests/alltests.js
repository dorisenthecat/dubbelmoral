var gamejs = require("gamejs");

var roomtest = require("tests/roomtest").run;
var studenttest = require("tests/studenttest").run;
var animationtest = require("tests/animationtest").run;

function runtests() {
    animationtest();
    roomtest();
    studenttest();
}

gamejs.ready(function() {
    runtests();
});
