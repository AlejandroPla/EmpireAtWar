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

    this.game.load.image('logo', 'images/phaser.png');  

    this.game.load.image('playbutton', 'resources/sprites/playButton.png');
    this.game.load.image('rulesbutton', 'resources/sprites/rulesButton.png');
    this.game.load.image('background', 'resources/sprites/backgroundImage.png');
  },

  create: function () {
    this.game.state.start('MainMenu');
  }
};

var menuScene={
  preload:function(){
     // TODO: load here the assets for the game
     this.game.load.image('logo', 'images/phaser.png');
     this.game.load.tilemap('level_01', 'resources/maps/level_01.Json', null, Phaser.Tilemap.TILED_JSON);
     this.game.load.image('Tile-set', 'resources/sprites/Tile-set.png');
     this.game.load.image('Colored_Tiles', 'resources/sprites/Colored_Tiles.png' )
     this.game.load.image('nextTurnIcon', 'resources/sprites/Hud/nextTurnIcon.png');
     this.game.load.image('unitIcon', 'resources/sprites/Hud/unitIcon.png');
     this.game.load.image('structureIcon', 'resources/sprites/Hud/structureIcon.png');
     this.game.load.image('inventoryBackground', 'resources/sprites/Hud/Inventory_Background.png');
     this.game.load.image('statsBackground', 'resources/sprites/Hud/Stats_Background.png');
     this.game.load.image('empty', 'resources/sprites/Hud/Empty.png');
     this.game.load.spritesheet('coinIcon', 'resources/sprites/Hud/coin.png', 120, 96, 6);
 
     //UNITS
     this.game.load.image('Red_Peasant', 'resources/sprites/Hud/Red_Peasant.png');
     this.game.load.image('Red_Lancer', 'resources/sprites/Hud/Red_Lancer.png');
     this.game.load.image('Red_Swordman', 'resources/sprites/Hud/Red_Swordman.png');
     this.game.load.image('Red_Horseman', 'resources/sprites/Hud/Red_Horseman.png');
     this.game.load.image('Yellow_Peasant', 'resources/sprites/Hud/Yellow_Peasant.png');
     this.game.load.image('Yellow_Lancer', 'resources/sprites/Hud/Yellow_Lancer.png');
     this.game.load.image('Yellow_Swordman', 'resources/sprites/Hud/Yellow_Swordman.png');
     this.game.load.image('Yellow_Horseman', 'resources/sprites/Hud/Yellow_Horseman.png');
 
     //STRUCTURES
     this.game.load.image('Red_Farm', 'resources/sprites/Hud/Red_Farm.png')
     this.game.load.image('Red_Tower', 'resources/sprites/Hud/Red_Tower.png');
     this.game.load.image('Red_Fortress', 'resources/sprites/Hud/Red_Fortress.png');
     this.game.load.image('Red_Base', 'resources/sprites/Hud/Red_Base.png');
     this.game.load.image('Yellow_Farm', 'resources/sprites/Hud/Yellow_Farm.png');
     this.game.load.image('Yellow_Tower', 'resources/sprites/Hud/Yellow_Tower.png');
     this.game.load.image('Yellow_Fortress', 'resources/sprites/Hud/Yellow_Fortress.png');
     this.game.load.image('Yellow_Base', 'resources/sprites/Hud/Yellow_Base.png');
 
     //INDICATORS
     this.game.load.image('movement', 'resources/sprites/Movement_Indicator.png');
     this.game.load.image('nope', 'resources/sprites/Nope_Indicator.png');
     this.game.load.image('combat', 'resources/sprites/Combat_Indicator.png');
  },
  create:function(){
    var background = this.game.add.sprite(0, 0, 'background2.png');
    var playButton = this.game.add.button(500, 100, 'playButton.png', this.PlayStart, this, 2, 1, 0);
    var ruleButton = this.game.add.button(500, 100, 'ruleButton.png', this.RuleStart, this, 2, 1, 0);
  },
  PlayStart:function(){
    this.game.state.start('play');
  },
  RuleStart:function(){
    this.game.state.start('Rules');
  }
};

var ruleScene={
  create:function(){
    var ruleImage = this.game.add.sprite(0, 0, 'rules.png');
    var backButton = this.game.add.button(500, 100, 'backButton.png', this.back, this, 2, 1, 0);
    backButton.scale.setTo(0.20, 0.20);
  },
  back:function(){
    this.game.state.start('MainMenu');
  }
}

var EndOfGame={
  create:function(){
    this.game.add.sprite(0, 0, 'endGame.png');
    var menuButton = this.game.add.button(500, 100, 'endGameButton.png', this.backMenu, this, 2, 1, 0);
  },
  backMenu:function(){
    this.game.state.start('MainMenu');
  }
}


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('MainMenu', menuScene);
  game.state.add('play', PlayScene);
  game.state.add('Rules', ruleScene);
  game.state.add('EndGame', EndOfGame);

  game.state.start('boot');
};