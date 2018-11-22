'use strict';

var PlayScene = require('./play_scene.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.tilemap('level_01', 'resources/maps/level_01.Json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('Tile-set', 'resources/sprites/Tile-set.png');
    this.game.load.image('Colored_Tiles', 'resources/sprites/Colored_Tiles.png' )
    this.game.load.image('nextTurnIcon', 'resources/sprites/Hud/nextTurnIcon.png');
    this.game.load.image('unitIcon', 'resources/sprites/Hud/unitIcon.png');
    this.game.load.image('structureIcon', 'resources/sprites/Hud/structureIcon.png');
    this.game.load.image('inventoryBackground', 'resources/sprites/Hud/Inventory_Background.png');
    this.game.load.image('empty', 'resources/sprites/Hud/Empty.png');
    //UNITS
    this.game.load.image('Red_Peasant', 'resources/sprites/Hud/Red_Peasant.png');
    this.game.load.image('Red_Lancer', 'resources/sprites/Hud/Red_Lancer.png');
    this.game.load.image('Red_Swordman', 'resources/sprites/Hud/Red_Swordman.png');
    this.game.load.image('Red_Horseman', 'resources/sprites/Hud/Red_Horseman.png');
    this.game.load.image('Yellow_Peasant', 'resources/sprites/Hud/Yellow_Peasant.png');
    this.game.load.image('Yellow_Lancer', 'resources/sprites/Hud/Yellow_Lancer.png');
    this.game.load.image('Yellow_Swordman', 'resources/sprites/Hud/Yellow_Swordman.png');
    this.game.load.image('Yellow_Horseman', 'resources/sprites/Hud/Yellow_Horseman.png');


  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
