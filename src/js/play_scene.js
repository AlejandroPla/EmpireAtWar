'use strict';

  var map = require("./map.js");
  var hud = require("./Hud.js");

  var PlayScene = {
  create: function () {
    map = new map (this.game);
    hud = new hud (this.game, this.map);
    map.StuffCounter();
  },

  update: function(){

  }
};

module.exports = PlayScene;
