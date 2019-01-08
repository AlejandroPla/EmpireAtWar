'use strict';

var map = require("./map.js");
var hud = require("./Hud.js");
var stats = require("./stats.js");

  var PlayScene = {
  create: function () {
    this.stats = new stats();
    this.map = new map(this.game, this.stats);
    this.hud = new hud(this.game, this.map, this.stats);
    this.pausedButton = this.game.add.button(250, 10, 'pausedButton', this.paused, this, 1, 1, 0);

  },
  update: function(){
      this.hud.UpdateFollower();
  },
  paused:function(){
    this.game.state.start('PausedMenu');
  }
};

module.exports = PlayScene;
