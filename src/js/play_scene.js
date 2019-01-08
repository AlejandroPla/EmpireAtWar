'use strict';

var map = require("./map.js");
var hud = require("./Hud.js");
var stats = require("./stats.js");

  var PlayScene = {
  create: function () {
    this.stats = new stats();
    this.map = new map(this.game, this.stats);
    this.hud = new hud(this.game, this.map, this.stats);
    this.returnToMenu = this.game.add.button(250, 5, 'menuButton', this.return, this, 1, 1, 0);
    this.returnToMenu.scale.setTo(0.8, 0.8);
  },
  update: function(){
      this.hud.UpdateFollower();
  },
  return:function(){
    this.game.state.start('MainMenu');
  }
};

module.exports = PlayScene;
