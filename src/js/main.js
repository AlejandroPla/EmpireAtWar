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

var music;

var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    this.game.load.image('logo', 'images/phaser.png');  

    this.game.load.image('playButton', 'resources/menu/buttons/playButton.png');
    this.game.load.image('rulesButton', 'resources/menu/buttons/rulesButton.png');
    this.game.load.image('backgroundImage', 'resources/menu/backgroundImage.png');
    this.game.load.image('aboutUs', 'resources/menu/imageText/aboutUs.png');
    this.game.load.image('aboutUsButton', 'resources/menu/buttons/aboutUsButton.png');
    this.game.load.image('backButton', 'resources/menu/buttons/backButton.png');
    this.game.load.image('rules1', 'resources/menu/imageText/rules1.png');
    this.game.load.image('rules2', 'resources/menu/imageText/rules2.png');
    this.game.load.image('rules3', 'resources/menu/imageText/rules3.png');
    this.game.load.image('rules4', 'resources/menu/imageText/rules4.png');
    this.game.load.image('endGame', 'resources/menu/imageText/endGame.png');
    this.game.load.image('nextButton', 'resources/menu/buttons/nextButton.png')

    //Audio
    this.game.load.audio('mainTheme', 'resources/audio/ImperiVm_ogg.ogg');
  },

  create: function () {
    music = this.game.add.audio('mainTheme', 0.5, true);
    this.game.state.start('MainMenu');
  }
};

var MenuScene={
  preload: function(){
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

     //Sounds
     this.game.load.audio('MenuClick', 'resources/audio/MenuClick.ogg');
     this.game.load.audio('MainTheme', 'resources/audio/ImperiVm_ogg.ogg')

     //GameOver
     this.game.load.image('gameOver', 'resources/menu/GameOver.png');
  
  },

  create:function(){
    this.background = this.game.add.image(0, 0, 'backgroundImage');
    this.playButton = this.game.add.button(50, 475, 'playButton', this.PlayStart, this, 1, 1, 0);
    this.ruleButton = this.game.add.button(250, 475, 'rulesButton', this.HowToPlayStart, this, 1, 1, 0);
    this.aboutUsButton = this.game.add.button(450, 450, 'aboutUsButton', this.AboutUsStart, this, 1, 1, 0); 
      music.play();
  },
  
  PlayStart:function(){
    this.game.state.start('play');
  },
  HowToPlayStart:function(){
    this.game.state.start('HowToPlay');
  },
  AboutUsStart:function(){
    this.game.state.start('AboutUs');
  }
};

var AboutUsScene={
  create:function(){
    this.aboutUsImage = this.game.add.image(0, 0, 'aboutUs');
    this.backButton = this.game.add.button(100, 500, 'backButton', this.back, this, 1, 1, 0);
  },
  back:function(){
    this.game.state.start('MainMenu');
  }
};

var HowToPlayScene={
  create:function(){
    this.HowToPlayImage = this.game.add.image(0, 0, 'rules1');
    this.nextButton = this.game.add.button(500, 515, 'nextButton', this.next, this, 1, 1, 0);
  },
  next:function(){
    this.game.state.start('HowToPlay2');
  }
};

var HowToPlayScene2={
  create:function(){
    this.HowToPlayImage2 = this.game.add.image(0, 0, 'rules2');
    this.nextButton = this.game.add.button(500, 515, 'nextButton', this.next, this, 1, 1, 0);
  },
  next:function(){
    this.game.state.start('HowToPlay3');
  }
};

var HowToPlayScene3={
  create:function(){
    this.HowToPlayImage3 = this.game.add.image(0, 0, 'rules3');
    this.nextButton = this.game.add.button(500, 515, 'nextButton', this.next, this, 1, 1, 0);
  },
  next:function(){
    this.game.state.start('HowToPlay4');
  }
};

var HowToPlayScene4={
  create:function(){
    this.HowToPlayImage4 = this.game.add.image(0, 0, 'rules4');
    this.backButton = this.game.add.button(500, 515, 'backButton', this.back, this, 1, 1, 0);
  },
  back:function(){
    this.game.state.start('MainMenu');
  }
};

var EndOfGame={
  create:function(){
    this.backgroundImage = this.game.add.image(-10, -15, 'endGame');
    this.menuButton = this.game.add.button(550, 50, 'backButton', this.backMenu, this, 1, 1, 0);
    this.gameOverText = this.game.add.image(200,250, 'gameOver');
    this.gameOverText.scale.setTo(1.3,1.3);
  },
  backMenu:function(){
    music.stop();
    this.game.state.start('MainMenu');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('MainMenu', MenuScene);
  game.state.add('play', PlayScene);
  game.state.add('HowToPlay', HowToPlayScene);
  game.state.add('HowToPlay2', HowToPlayScene2);
  game.state.add('HowToPlay3', HowToPlayScene3);
  game.state.add('HowToPlay4', HowToPlayScene4);
  game.state.add('EndGame', EndOfGame);
  game.state.add('AboutUs', AboutUsScene);
  game.state.start('boot');
};