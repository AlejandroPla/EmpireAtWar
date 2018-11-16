'use strict';

  var map = require("./map.js");

  var PlayScene = {
  create: function () {
    map = new map(this.game);
    map.StuffCounter();
  },

  update: function(){
    map.UpdateTrees();
  }
};

module.exports = PlayScene;
