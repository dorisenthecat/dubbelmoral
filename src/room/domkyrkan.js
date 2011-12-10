var gamejs = require('gamejs');
var room = require('./room');

gamejs.preload(["images/domkyrkan.png"]);

var Domkyrkan = exports.Domkyrkan = function() {
	Domkyrkan.superConstructor.apply(this, arguments);

    this.backgroundImage = gamejs.image.load("images/domkyrkan.png"); // todo: load once, not per object

    return this;
};
gamejs.utils.objects.extend(Domkyrkan, room.Room);

Domkyrkan.prototype.init = function() {
	Domkyrkan.superClass.init.apply(this, arguments);
};
