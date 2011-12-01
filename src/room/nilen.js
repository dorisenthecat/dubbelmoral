var gamejs = require('gamejs');
var room = require('./room');

gamejs.preload(["images/nilen.png"]);

var Nilen = exports.Nilen = function() {
    Nilen.superConstructor.apply(this, arguments);
    
    this.backgroundImage = gamejs.image.load("images/nilen.png"); // todo: load once, not per object
    
    return this;
};
gamejs.utils.objects.extend(Nilen, room.Room);
