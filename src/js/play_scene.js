'use strict';

var map = require("./map.js");
var hud = require("./Hud.js");

  var PlayScene = {
  create: function () {
    this.map = new map(this.game);
    this.hud = new hud(this.game, this.map);
  },

  update: function(){

  }
};

module.exports = PlayScene;
