(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//"Hud" CREATES AND MANAGES THE HUD OF THE GAME WICH CONTAINS THE MENUS AND THE WHOLE INTERFACE AS WELL AS MANAGES THE INPUT LOGIC AND THE INTERACTION WITH THE USER

var hud = function(game, map, stats){
    this.game = game;
    this.map = map;
    this.stats = stats;
    this.currentPlayer = false;
    this.moneyR = 50;
    this.moneyY = 60;

//Selection data
    this.selected = false;
    this.selectedIndex = 0;
    this.selectedPrice = 0;
    
//Interface
//Click area
    this.clickArea = game.add.sprite(0,0,'empty');
    this.clickArea.height = this.game.height;
    this.clickArea.width = this.game.width;
    //Input logic
    this.clickArea.inputEnabled = true;
    this.clickArea.events.onInputDown.add(this.listenerClick, this);

//Inventory background / frame
    this.inventoryBackground = game.add.image( this.game.width / 2, this.game.height *0.98, 'inventoryBackground');
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = false;
    this.inventoryBackground.inputEnabled = true;

//Over background / frame
    this.overBackground = game.add.image(this.game.width / 2, this.game.height * 0.98 - this.inventoryBackground.height - 10, 'statsBackground');
    this.overBackground.anchor.setTo(0,1);
    this.overBackground.scale.setTo(1,0.8);
    this.overBackground.visible = false;
    this.overBackground.inputEnabled = true;

//Stats info
    this.nameTxt = game.add.text(this.overBackground.width / 2, -this.overBackground.height -10,'Peasant');
    this.nameTxt.anchor.setTo(0.5,0);
    this.nameTxt.fontSize = 20;
    this.overBackground.addChild(this.nameTxt);
    this.priceTxt = game.add.text(10, - this.overBackground.height *0.80, 'Price: ');
    this.priceTxt.fontSize = 18;
    this.overBackground.addChild(this.priceTxt);
    this.priceTxt.anchor.setTo(0,0);
    this.strengthTxt =game.add.text(10, -10, 'Strength: ');
    this.strengthTxt.anchor.setTo(0,1);
    this.strengthTxt.fontSize = 18;
    this.overBackground.addChild(this.strengthTxt);

//Turn Text (Top-right corner)
    this.turnText = game.add.text(this.game.width - this.game.width * 0.10, 0.01 * this.game.height, 'Turn ')
    this.turnText.anchor.setTo(1,0);
    this.turnText.fontSize = this.stats.fontSize;
    this.currentTurn = this.map.turn;
    this.currentTurnText = game.add.text((this.game.width - this.game.width * 0.10)+ 45, 0.01 * this.game.height, this.currentTurn);
    this.currentTurnText.anchor.setTo(1,0);
    this.currentTurnText.fontSize =  this.stats.fontSize;

//Money text
    this.moneyText = game.add.text(this.game.width * 0.05, 0.01 * this.game.height, 'Money ')
    this.moneyText.anchor.setTo(0,0);
    this.moneyText.fontSize = this.stats.fontSize;
    this.moneyShown = this.moneyY;
    this.moneyAmount = game.add.text((this.game.width * 0.05) + 130, 0.01 * this.game.height, this.moneyShown);
    this.moneyAmount.anchor.setTo(1,0);
    this.moneyAmount.fontSize = this.stats.fontSize;
    this.coinIcon = game.add.sprite((this.game.width * 0.05) + 135, 0.018 * this.game.height, 'coinIcon');
    this.coinIcon.scale.setTo(0.20);
    this.coinIcon.anchor.setTo(0,0);
    this.coinIcon.animations.add('spin',[0,1,2,3,4,5,6], 6, true);
    this.coinIcon.animations.play('spin');

//nextTurnIcon (Bottom-right corner, black arrow)
    this.nextTurnIcon = this.game.add.sprite(this.game.width, this.game.height, 'nextTurnIcon');
    this.nextTurnIcon.scale.setTo(0.15);
    this.nextTurnIcon.anchor.setTo(1,1);
    //Input logic
    this.nextTurnIcon.inputEnabled = true;  
    this.nextTurnIcon.events.onInputDown.add(this.listenerTurn, this);

//structureIcon (Bottom-center, black house)
    this.structureIcon = this.game.add.sprite(this.game.width / 2 - (this.game.width * 0.05), this.game.height - this.game.height * 0.02, 'structureIcon');
    this.structureIcon.anchor.setTo(1,1);
    this.structureIcon.scale.setTo(0.10);
    //Input logic
    this.structureIcon.inputEnabled = true;  
    this.structureIcon.events.onInputDown.add(this.listenerStructure, this);

//unitIcon  (Bottom-center, black lancer)
    this.unitIcon = this.game.add.sprite(this.game.width / 2 + (this.game.width * 0.05), this.game.height - this.game.height * 0.02, 'unitIcon');
    this.unitIcon.anchor.setTo(0,1);
    this.unitIcon.scale.setTo(0.10);
    //Input logic
    this.unitIcon.inputEnabled = true;  
    this.unitIcon.events.onInputDown.add(this.listenerUnit, this);


//UNITS / STRUCTURES GLOBAL VARIABLES
    this.heightPaddle = this.inventoryBackground.height * 0.25;
    this.widthPaddle1 = this.inventoryBackground.width * 0.15;
    this.widthPaddle = this.inventoryBackground.width * 0.20;

//UNITS (RED)
//Peasant
    this.Red_Peasant = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 , this.game.height * 0.98 - this.heightPaddle, 'Red_Peasant');
    this.Red_Peasant.anchor.setTo(0,1);
    this.Red_Peasant.scale.setTo(2);
    this.Red_Peasant.visible = false;
    this.Red_Peasant.index = this.stats.peasantIndexRed;
    this.Red_Peasant.name = this.stats.peasantName;
    this.Red_Peasant.price = this.stats.peasantPrice;
    this.Red_Peasant.strength = this.stats.peasantStrength;
    //Input logic
    this.Red_Peasant.inputEnabled = true;
    this.Red_Peasant.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Peasant.events.onInputOver.add(this.listenerOver, this);
    this.Red_Peasant.events.onInputOut.add(this.listenerOut, this);

//Lancer
    this.Red_Lancer = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Red_Lancer');
    this.Red_Lancer.anchor.setTo(0,1);
    this.Red_Lancer.scale.setTo(2);
    this.Red_Lancer.visible = false;
    this.Red_Lancer.index = this.stats.lancerIndexRed;
    this.Red_Lancer.name = this.stats.lancerName;
    this.Red_Lancer.price = this.stats.lancerPrice;
    this.Red_Lancer.strength = this.stats.lancerStrength;
    //Input logic
    this.Red_Lancer.inputEnabled = true;
    this.Red_Lancer.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Lancer.events.onInputOver.add(this.listenerOver, this);
    this.Red_Lancer.events.onInputOut.add(this.listenerOut, this);

//Swordman
    this.Red_Swordman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Red_Swordman');
    this.Red_Swordman.anchor.setTo(0,1);
    this.Red_Swordman.scale.setTo(2);
    this.Red_Swordman.visible = false;
    this.Red_Swordman.index = this.stats.swordmanIndexRed;
    this.Red_Swordman.name = this.stats.swordmanName;
    this.Red_Swordman.price = this.stats.swordmanPrice;
    this.Red_Swordman.strength = this.stats.swordmanStrength;
    //Input logic
    this.Red_Swordman.inputEnabled = true;
    this.Red_Swordman.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Swordman.events.onInputOver.add(this.listenerOver, this);
    this.Red_Swordman.events.onInputOut.add(this.listenerOut, this);

//Horseman
    this.Red_Horseman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Red_Horseman');
    this.Red_Horseman.anchor.setTo(0,1);
    this.Red_Horseman.scale.setTo(2);
    this.Red_Horseman.visible = false;
    this.Red_Horseman.index = this.stats.horsemanIndexRed;
    this.Red_Horseman.name = this.stats.horsemanName;
    this.Red_Horseman.price = this.stats.horsemanPrice;
    this.Red_Horseman.strength = this.stats.horsemanStrength;
    //Input logic
    this.Red_Horseman.inputEnabled = true;
    this.Red_Horseman.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Horseman.events.onInputOver.add(this.listenerOver, this);
    this.Red_Horseman.events.onInputOut.add(this.listenerOut, this);

//UNITS (YELLOW)
//Peasant
    this.Yellow_Peasant = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Peasant');
    this.Yellow_Peasant.anchor.setTo(0,1);
    this.Yellow_Peasant.scale.setTo(2);
    this.Yellow_Peasant.visible = false;
    this.Yellow_Peasant.index = this.stats.peasantIndexYellow;
    this.Yellow_Peasant.name = this.stats.peasantName;
    this.Yellow_Peasant.price = this.stats.peasantPrice;
    this.Yellow_Peasant.strength = this.stats.peasantStrength;
    //Input logic
    this.Yellow_Peasant.inputEnabled = true;
    this.Yellow_Peasant.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Peasant.events.onInputOver.add(this.listenerOver, this);
    this.Yellow_Peasant.events.onInputOut.add(this.listenerOut, this);

//Lancer
    this.Yellow_Lancer = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Lancer');
    this.Yellow_Lancer.anchor.setTo(0,1);
    this.Yellow_Lancer.scale.setTo(2);
    this.Yellow_Lancer.visible = false;
    this.Yellow_Lancer.index = this.stats.lancerIndexYellow;
    this.Yellow_Lancer.name = this.stats.lancerName;
    this.Yellow_Lancer.price = this.stats.lancerPrice;
    this.Yellow_Lancer.strength = this.stats.lancerStrength;
    //Input logic
    this.Yellow_Lancer.inputEnabled = true;
    this.Yellow_Lancer.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Lancer.events.onInputOver.add(this.listenerOver, this);
    this.Yellow_Lancer.events.onInputOut.add(this.listenerOut, this);

//Swordman
    this.Yellow_Swordman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Swordman');
    this.Yellow_Swordman.anchor.setTo(0,1);
    this.Yellow_Swordman.scale.setTo(2);
    this.Yellow_Swordman.visible = false;
    this.Yellow_Swordman.index = this.stats.swordmanIndexYellow;
    this.Yellow_Swordman.name = this.stats.swordmanName;
    this.Yellow_Swordman.price = this.stats.swordmanPrice;
    this.Yellow_Swordman.strength = this.stats.swordmanStrength;
    //Input logic
    this.Yellow_Swordman.inputEnabled = true;
    this.Yellow_Swordman.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Swordman.events.onInputOver.add(this.listenerOver, this);
    this.Yellow_Swordman.events.onInputOut.add(this.listenerOut, this);

//Horseman
    this.Yellow_Horseman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Horseman');
    this.Yellow_Horseman.anchor.setTo(0,1);
    this.Yellow_Horseman.scale.setTo(2);
    this.Yellow_Horseman.visible = false;
    this.Yellow_Horseman.index = this.stats.horsemanIndexYellow;
    this.Yellow_Horseman.name = this.stats.horsemanName;
    this.Yellow_Horseman.price = this.stats.horsemanPrice;
    this.Yellow_Horseman.strength = this.stats.horsemanStrength;
    //Input logic
    this.Yellow_Horseman.inputEnabled = true;
    this.Yellow_Horseman.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Horseman.events.onInputOver.add(this.listenerOver, this);
    this.Yellow_Horseman.events.onInputOut.add(this.listenerOut, this);

//Follower
    this.follower = game.add.image(100,100,'Red_Peasant');
    this.follower.scale.setTo(2);
    this.follower.anchor.setTo(0,0);
    this.follower.visible = false;

}

hud.prototype.AllUnitsOn = function(player){    //DEPENDING ON THE CURRENT PLAYER, MAKES VISIBLE THE APROPIATE UNITS INTERFACE ICONS
    if(player){
        this.Red_Peasant.visible = true;
        this.Red_Lancer.visible = true;
        this.Red_Swordman.visible = true;
        this.Red_Horseman.visible = true;
    }
    else
    {
        this.Yellow_Peasant.visible = true;
        this.Yellow_Lancer.visible = true;
        this.Yellow_Swordman.visible = true;
        this.Yellow_Horseman.visible = true;
    }
}

hud.prototype.AllUnitsOff = function(){ //MAKES NOT VISIBLE ALL THE UNITS INTERFACE ICONS
        this.Red_Peasant.visible = false;
        this.Red_Lancer.visible = false;
        this.Red_Swordman.visible = false;
        this.Red_Horseman.visible = false;
        this.Yellow_Peasant.visible = false;
        this.Yellow_Lancer.visible = false;
        this.Yellow_Swordman.visible = false;
        this.Yellow_Horseman.visible = false;
}

hud.prototype.listenerTurn = function(){    //NEXT TURN LOGIC
    this.currentPlayer = !this.currentPlayer;   //Swap players
    this.map.UpdateMap(this.currentPlayer);     //Updates the map
    this.currentTurnText.text = this.map.turn;  //Updates the current turn text on the interface
    this.listenerClick();                       //Calls for the aproppiate click reaction
    this.updateMoney();
}

hud.prototype.listenerClick = function(){   //APROPPIATE CLICK LOGIC
    if(this.inventoryBackground.visible == true){   //If the inventory menus are opened it closes them
        this.inventoryBackground.visible = false;
        this.unitIcon.visible = true;
        this.structureIcon.visible = true;
        this.AllUnitsOff();
    }
    else{   //If not, it means that the player is trying to place some unit or structure or selecting a territory, unit or structure

        this.clickPoint = this.game.input.position;                                                         //the click position is get
        this.map.ForegroundLayer.getTileXY(this.clickPoint.x/1.8, this.clickPoint.y/1.8, this.clickPoint);  //it is translated to the tile in that position

        if(this.selected){                                                                                      //If the player bought an unit / structure,
            if(this.map.PlaceUnit(this.clickPoint, this.selectedIndex))                                         //tries to place the entity. If it succeeds,
            {
                this.follower.visible = false;                                                                  //Follower Visible off 
                if(this.currentPlayer)          {
                    this.moneyR = this.moneyR - this.selectedPrice;                                             //decreases the aproppiate amount of money to the proper player
                }                                                               

                else{
                    this.moneyY = this.moneyY - this.selectedPrice;
                }
                this.selectedReset();
                this.updateMoney();             
            }
            
        }
        else{   //If not it means he is selecting an unit, territory or structure
            var fourPos = this.map.FourPos(this.clickPoint);
            console.log(fourPos);

            for (let index = 0; index < 4; index++) {
                ;
                
            }
        }
        
    }
}
hud.prototype.updateMoney = function (){    //Updates the money display
    if(this.currentPlayer)
        this.moneyAmount.text = this.moneyR;
    else
        this.moneyAmount.text = this.moneyY;
}

hud.prototype.selectedReset = function(){   //Resets the unit/structure selection to NOT selected
    this.selectedIndex = 0;
    this.selectedPrice = 0;
    this.selected = false;
}

hud.prototype.listenerStructure = function(){   //OPENS THE STRUCTURES INVENTORY
    this.selectedReset();
    this.inventoryBackground.anchor.setTo(1,1);
    this.inventoryBackground.visible = true;
    this.structureIcon.visible = false;
    this.unitIcon.visible = true;
    this.AllUnitsOff();
}

hud.prototype.listenerOver = function(Overed){  //Opens the unit stats display
    this.priceTxt.text = 'Price:       ' + Overed.price;
    this.strengthTxt.text = 'Strength: ' + Overed.strength;
    this.nameTxt.text = Overed.name;
    this.overBackground.visible = true;
}

hud.prototype.listenerOut = function(){ //Closes the unit stats display
    this.overBackground.visible = false;
}

hud.prototype.listenerUnit = function(){    //OPENS THE UNITS INVENTORY
    this.selectedReset();
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = true;
    this.unitIcon.visible = false;
    this.structureIcon.visible = true;
    this.AllUnitsOn(this.currentPlayer);
}

hud.prototype.listenerUnitSelection = function (clicked){   //DETERMINATES WICH UNIT WAS SELECTED AND VERIFIES IF THERE IS ENOUGH MONEY TO BUY IT
    
    if(this.currentPlayer)
        if(this.moneyR >= clicked.price){
            this.follower.loadTexture(clicked.texture);
            this.follower.visible = true;
            this.select(clicked);
        }
        else
            console.log("Not enough money to buy..");

    else
        if(this.moneyY >= clicked.price){
            this.follower.loadTexture(clicked.texture);
            this.follower.visible = true;
            this.select(clicked);
        }
        else
            console.log("Not enough money to buy..");
}

hud.prototype.UpdateFollower = function(){  //Updates the position of the cursor follower
    if(this.selected){
        this.follower.position.set(this.game.input.worldX - this.game.input.worldX %28.8, this.game.input.worldY - this.game.input.worldY % 28.8);
    }
}

hud.prototype.select = function(clicked){   //Selects an unit/structure to buy
    console.log("Selected!");
    this.selectedIndex = clicked.index;
    this.selected = true;
    this.selectedPrice = clicked.price;
    this.listenerClick();
}

module.exports = hud;
},{}],2:[function(require,module,exports){
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

    //INDICATORS
    this.game.load.image('movement', 'resources/sprites/Movement_Indicator.png');
    this.game.load.image('nope', 'resources/sprites/Nope_Indicator.png');
    this.game.load.image('combat', 'resources/sprites/Combat_Indicator.png');

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

},{"./play_scene.js":4}],3:[function(require,module,exports){
'use strict';
var unit = require("./units.js");

var map = function(game, stats){
    this.game = game;
    this.stats = stats;
    this.map = this.game.add.tilemap('level_01');
    this.map.addTilesetImage('Tile-set');
    this.map.addTilesetImage('Colored_Tiles')
    this.BackgroundLayer = this.map.createLayer("Background");
    this.GroundLayer = this.map.createLayer("Ground");
    this.ForegroundLayer = this.map.createLayer("Foreground");

    //Units group
    this.unitsArray = new Array(this.map.height);
    this.createUnitsArray();

    //Scale
    this.BackgroundLayer.scale.set(1.8);
    this.GroundLayer.scale.set(1.8);
    this.ForegroundLayer.scale.set(1.8);
    
    this.BackgroundLayer.resizeWorld();
    this.GroundLayer.resizeWorld();
    this.ForegroundLayer.resizeWorld();

    //AUX
    this.turn = 0;
};

map.prototype.createUnitsArray = function(){
    for (let index = 0; index < this.unitsArray.length; index++) {
        this.unitsArray[index] = new Array(this.map.width);
    }
};

map.prototype.creatUnit = function(x,y,unitType){
    this.unitsArray[y][x] = new unit (unitType);
};

map.prototype.StuffCounter = function(currentPlayer)
{
    this.turn++;
    console.log("CURRENT GAME STATUS INFO (" + this.turn + "): ");

      var treeCount = 0;
      var mountainCount = 0;
      for(var y = 0; y < this.map.height; y ++){
        for(var x = 0; x < this.map.width; x ++){
           if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 5)
           treeCount++;
           else if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 11)
           mountainCount++;
        }
      }
      console.log("Árbol: " + treeCount);
      console.log("Montaña: " + mountainCount);
    if(currentPlayer)
        console.log("Current player = RED");
    else
    console.log("Current player = YELLOW");
};

map.prototype.UpdateMap = function(currentPlayer) {
    this.UpdateTrees();
    this.StuffCounter(currentPlayer);
};

map.prototype.UpdateTrees = function(){

    for(var y = 0; y < this.map.height; y ++){
        for(var x = 0; x < this.map.width; x ++){
           if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 5)  //Si es árbol
           {
                if(Math.random() < this.stats.treeGrowRatio)  //Probabilidad de que aparezca otro árbol
                {
                    var newTreePosX = 0;
                    var newTreePosY = 0;
                    var rnd = Math.random();

                    if(rnd <= 0.25){
                        newTreePosY = -1;   //Arriba
                    }
                    else if(rnd <= 0.5){
                        newTreePosY =  1;    //Abajo
                    }
                    else if(rnd <= 0.75){
                        newTreePosX = - 1;    //Izquierda
                    }
                    else{                        
                        newTreePosX = 1;     //Derecha
                    }

                    var nextPosElem = this.map.getTile(x + newTreePosX , y + newTreePosY, this.BackgroundLayer,true).index;

                    if( nextPosElem == 3 || nextPosElem == 1) //Es hierba sin nada encima
                    {
                        if(this.map.getTile(x + newTreePosX , y + newTreePosY, this.ForegroundLayer,true).index == -1)
                        {
                            this.map.putTile(5, x + newTreePosX, y + newTreePosY, this.ForegroundLayer);    //Convierte en árbol
                        }
                    }
                }
           }
        }
    }
}
map.prototype.PlaceUnit = function(clickPoint, type){

    this.placed = false;

    if(this.map.getTile(clickPoint.x, clickPoint.y, this.BackgroundLayer,true).index == 3 || this.map.getTile(clickPoint.x, clickPoint.y, this.BackgroundLayer,true).index == 1){ //Es hierba
        if(this.map.getTile(clickPoint.x, clickPoint.y,this.ForegroundLayer,true).index == -1){ //Nada ocupado
        
            this.placed = true;
            this.creatUnit(clickPoint.x,clickPoint.y,type);
            this.map.putTile(type, clickPoint.x, clickPoint.y, this.ForegroundLayer);
            console.log(this.unitsArray[clickPoint.y][clickPoint.x].name + " placed at " + clickPoint.x + "/" + clickPoint.y);  //Console info
        }
            
    }
    else
    ;
    return this.placed;    
}

map.prototype.FourPos = function (pos){ //Return an array with the entities on the four direction around a given position
    var fourPos = [0,0,0,0];    //Top, right , down, left

        fourPos [0] = this.WhatIsIt(pos.x, pos.y - 1);
        fourPos [1] = this.WhatIsIt(pos.x + 1, pos.y);
        fourPos [2] = this.WhatIsIt(pos.x, pos.y + 1);
        fourPos [3] = this.WhatIsIt(pos.x - 1, pos.y);
    return fourPos;
}

map.prototype.WhatIsIt = function (x,y){
    var backElem = this.map.getTile(x, y, this.BackgroundLayer, true).index;
    if(backElem != 3 && backElem != 1)  //Beach or water   (Out of game zone)
        return 0;

    else{                               //Inside game zone
        var foreElem = this.map.getTile(x, y, this.ForegroundLayer, true).index;

        if (foreElem == 5) //Tree
            return 2;
        else if (foreElem == -1)//Vacío
            return 1;
        else if(this.stats.IsUnit(foreElem))                    //Unit
            return 3;
        else
            return 0;
    }
}

module.exports = map;
},{"./units.js":6}],4:[function(require,module,exports){
'use strict';

var map = require("./map.js");
var hud = require("./Hud.js");
var stats = require("./stats.js");

  var PlayScene = {
  create: function () {
    this.stats = new stats();
    this.map = new map(this.game, this.stats);
    this.hud = new hud(this.game, this.map, this.stats);
  },

  update: function(){
      this.hud.UpdateFollower();
  }
};

module.exports = PlayScene;

},{"./Hud.js":1,"./map.js":3,"./stats.js":5}],5:[function(require,module,exports){
'use strict';

//"stats" CONTAINS THE ENTITIES AND OTHER GAME STATS THAT AFFECTS ITS BEHAVIOUR

var stats = function(){

//Memory
this.unitsInGame = [255,262,121,128,122,129,123,130];
this.structuresInGame = [];

//GAMEPLAY
this.treeGrowRatio          = 0.15; // [0, 1] Probabilidad de que aparezca un nuevo árbol
this.fontSize               = 25;

//UNITS
    this.peasantLife        = 5;    //PEASANT
    this.peasantStrength    = 10;
    this.peasantPrice       = 5;
    this.peasantMaintenance = 5;
    this.peasantIndexRed    = 255;
    this.peasantIndexYellow = 262;
    this.peasantName        = "Peasant";

    this.lancerLife        = 10;    //LANCER
    this.lancerStrength    = 15;
    this.lancerPrice       = 10;
    this.lancerMaintenance = 10;
    this.lancerIndexRed    = 121;
    this.lancerIndexYellow = 128;
    this.lancerName        = "Lancer";


    this.swordmanLife        = 15;  //SWORDMAN
    this.swordmanStrength    = 20;
    this.swordmanPrice       = 15;
    this.swordmanMaintenance = 15;
    this.swordmanIndexRed    = 122;
    this.swordmanIndexYellow = 129;
    this.swordmanName        = "Swordman";


    this.horsemanLife        = 20;  //HORSEMAN
    this.horsemanStrength    = 25;
    this.horsemanPrice       = 20;
    this.horsemanMaintenance = 20;
    this.horsemanIndexRed    = 123;
    this.horsemanIndexYellow = 130;
    this.horsemanName        = "Horseman";

}

stats.prototype.IsUnit = function(x){       //Returns if the index given is one of the units in-game
    var i = 0;
    while(i < this.unitsInGame.length && x != this.unitsInGame[i])
        i++;

    if(i == this.unitsInGame.length)
        return false;
    else
        return true;

}

module.exports = stats;
},{}],6:[function(require,module,exports){
'use strict';

//"units" CREATES THE UNITS ENTITIES OF THE GAME BY USING THE STATS FROM "stats"

var stats = require("./stats.js");

//Player logic color representation
//RED = true - YELLOW = false

var unit = function(type){ 

    this.stats = new stats();

    if(type == this.stats.peasantIndexRed)                                     
        this.Peasant(true);
    else if(type == this.stats.peasantIndexYellow)
        this.Peasant(false);
    else if(type == this.stats.lancerIndexRed)
        this.Lancer(true);
    else if(type == this.stats.lancerIndexYellow)
        this.Lancer(false);
    else if(type == this.stats.swordmanIndexRed)
        this.Swordman(true);
    else if(type == this.stats.swordmanIndexYellow)
        this.Swordman(false);
    else if(type == this.stats.horsemanIndexRed)
        this.Horseman(true);
    else if(type == this.stats.horsemanIndexYellow)
        this.Horseman(false);
}
/*var Peasant = function(player) {

    unit.call(this, this.stats.peasantLife, this.stats.peasantStrength, this.stats.peasantPrice, this.stats.peasantMantenance);

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}
Peasant.prototype = Object.create(unit.prototype);
Peasant.prototype.constructor = Peasant;

unit.prototype.HasMoney = function(money){
    return money >= this.price;
}*/

unit.prototype.Peasant = function(player){  //PEASANT
    this.name = this.stats.peasantName;
    this.life = this.stats.peasantLife;
    this.strenght = this.stats.peasantStrength;
    this.price = this.stats.peasantPrice;
    this.maintenance = this.stats.peasantMaintenance;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

unit.prototype.Lancer = function(player){   //LANCER
    this.name = this.stats.lancerName;
    this.life = this.stats.lancerLife;
    this.strenght = this.stats.lancerStrength;
    this.price = this.stats.lancerPrice;
    this.maintenance = this.stats.lancerMaintenance;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

unit.prototype.Swordman = function(player){ //SWORDMAN
    this.name = this.stats.swordmanName;
    this.life = this.stats.swordmanLife;
    this.strenght = this.stats.swordmanStrength;
    this.price = this.stats.swordmanPrice;
    this.maintenance = this.stats.swordmanMaintenance;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

unit.prototype.Horseman = function(player){ //HORSEMAN
    this.name = this.stats.horsemanName;
    this.life = this.stats.horsemanLife;
    this.strenght = this.stats.horsemanStrength;
    this.price = this.stats.horsemanPrice;
    this.maintenance = this.stats.horsemanMaintenance;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

module.exports = unit;
},{"./stats.js":5}]},{},[2]);
