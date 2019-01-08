(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//"Hud" CREATES AND MANAGES THE HUD OF THE GAME WICH CONTAINS THE MENUS AND THE WHOLE INTERFACE AS WELL AS MANAGES THE INPUT LOGIC AND THE INTERACTION WITH THE USER

var hud = function(game, map, stats){
    this.game = game;
    this.map = map;
    this.stats = stats;
    this.currentPlayer = false;
    this.moneyR = 28;
    this.moneyY = 30;

//Selection data
    this.selected = false;
    this.selectedIndex = 0;
    this.selectedPrice = 0;
    this.selectedStrenght = 0
    this.selectedForAction = new Phaser.Point();

//Sounds
this.MenuClick = game.add.audio('MenuClick');
//Interface
//Indicators
this.indicators = new Array(4);
this.indicating = false;
this.indKey = new Array(4);
this.indKey[0] = new Phaser.Point(0,-1);
this.indKey[1] = new Phaser.Point(1,0);
this.indKey[2] = new Phaser.Point(0,1);
this.indKey[3] = new Phaser.Point(-1,0);

//Click area
    this.clickArea = game.add.sprite(0,0,'empty');
    this.clickArea.height = this.game.height;
    this.clickArea.width = this.game.width;
    //Input logic
    this.clickArea.inputEnabled = true;
    this.clickArea.events.onInputDown.add(this.listenerClick, this);

//Inventory background / frame
    this.inventoryBackground = game.add.image( this.game.width / 2, this.game.height * 0.98, 'inventoryBackground');
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
    this.Red_Peasant.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Red_Lancer.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Red_Swordman.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Red_Horseman.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Yellow_Peasant.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Yellow_Lancer.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Yellow_Swordman.events.onInputOver.add(this.listenerOverUnit, this);
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
    this.Yellow_Horseman.events.onInputOver.add(this.listenerOverUnit, this);
    this.Yellow_Horseman.events.onInputOut.add(this.listenerOut, this);

//STRUCTURES (RED)
//Farm
    this.Red_Farm = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1, this.game.height * 0.98 - this.heightPaddle, 'Red_Farm');
    this.Red_Farm.anchor.setTo(10,1);
    this.Red_Farm.scale.setTo(2);
    this.Red_Farm.visible = false;
    this.Red_Farm.index = this.stats.farmIndexRed;
    this.Red_Farm.name = this.stats.farmName;
    this.Red_Farm.price = this.stats.farmPrice;
    this.Red_Farm.strength = this.stats.farmStrength;
    //Input logic
    this.Red_Farm.inputEnabled = true;
    this.Red_Farm.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Farm.events.onInputOver.add(this.listenerOverStructure, this);
    this.Red_Farm.events.onInputOut.add(this.listenerOut, this);

//Tower
    this.Red_Tower = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Red_Tower');
    this.Red_Tower.anchor.setTo(10,1);
    this.Red_Tower.scale.setTo(2);
    this.Red_Tower.visible = false;
    this.Red_Tower.index = this.stats.towerIndexRed;
    this.Red_Tower.name = this.stats.towerName;
    this.Red_Tower.price = this.stats.towerPrice;
    this.Red_Tower.strength = this.stats.towerStrength;
    //Input logic
    this.Red_Tower.inputEnabled = true;
    this.Red_Tower.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Tower.events.onInputOver.add(this.listenerOverStructure, this);
    this.Red_Tower.events.onInputOut.add(this.listenerOut, this);

//Fortress
    this.Red_Fortress = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Red_Fortress');
    this.Red_Fortress.anchor.setTo(10,1);
    this.Red_Fortress.scale.setTo(2);
    this.Red_Fortress.visible = false;
    this.Red_Fortress.index = this.stats.fortressIndexRed;
    this.Red_Fortress.name = this.stats.fortressName;
    this.Red_Fortress.price = this.stats.fortressPrice;
    this.Red_Fortress.strength = this.stats.fortressStrength;
    //Input logic
    this.Red_Fortress.inputEnabled = true;
    this.Red_Fortress.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Fortress.events.onInputOver.add(this.listenerOverStructure, this);
    this.Red_Fortress.events.onInputOut.add(this.listenerOut, this);

//Base
    this.Red_Base = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Red_Base');
    this.Red_Base.anchor.setTo(1,1);
    this.Red_Base.scale.setTo(2);
    this.Red_Base.visible = false;
    this.Red_Base.index = this.stats.baseIndexRed;
    this.Red_Base.income = this.stats.baseIncome;
    //Input logic
    this.Red_Base.inputEnabled = true;
    this.Red_Base.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Red_Base.events.onInputOver.add(this.listenerOverStructure, this);
    this.Red_Base.events.onInputOut.add(this.listenerOut, this);

//STRUCTURES (YELLOW)
//Farm
    this.Yellow_Farm = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Farm');
    this.Yellow_Farm.anchor.setTo(10,1);
    this.Yellow_Farm.scale.setTo(2);
    this.Yellow_Farm.visible = false;
    this.Yellow_Farm.index = this.stats.farmIndexYellow;
    this.Yellow_Farm.name = this.stats.farmName;
    this.Yellow_Farm.price = this.stats.farmPrice;
    this.Yellow_Farm.strength = this.stats.farmStrength;
    //Input logic
    this.Yellow_Farm.inputEnabled = true;
    this.Yellow_Farm.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Farm.events.onInputOver.add(this.listenerOverStructure, this);
    this.Yellow_Farm.events.onInputOut.add(this.listenerOut, this);

//Tower
    this.Yellow_Tower = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Tower');
    this.Yellow_Tower.anchor.setTo(14,1);
    this.Yellow_Tower.scale.setTo(2);
    this.Yellow_Tower.visible = false;
    this.Yellow_Tower.index = this.stats.towerIndexYellow;
    this.Yellow_Tower.name = this.stats.towerName;
    this.Yellow_Tower.price = this.stats.towerPrice;
    this.Yellow_Tower.strength = this.stats.towerStrength;
    //Input logic
    this.Yellow_Tower.inputEnabled = true;
    this.Yellow_Tower.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Tower.events.onInputOver.add(this.listenerOverStructure, this);
    this.Yellow_Tower.events.onInputOut.add(this.listenerOut, this);

//Fortress
    this.Yellow_Fortress = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Fortress');
    this.Yellow_Fortress.anchor.setTo(10,1);
    this.Yellow_Fortress.scale.setTo(2);
    this.Yellow_Fortress.visible = false;
    this.Yellow_Fortress.index = this.stats.fortressIndexYellow;
    this.Yellow_Fortress.name = this.stats.fortressName;
    this.Yellow_Fortress.price = this.stats.fortressPrice;
    this.Yellow_Fortress.strength = this.stats.fortressStrength;
    //Input logic
    this.Yellow_Fortress.inputEnabled = true;
    this.Yellow_Fortress.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Fortress.events.onInputOver.add(this.listenerOverStructure, this);
    this.Yellow_Fortress.events.onInputOut.add(this.listenerOut, this);

//Base
    this.Yellow_Base = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Base');
    this.Yellow_Base.anchor.setTo(1,1);
    this.Yellow_Base.scale.setTo(2);
    this.Yellow_Base.visible = false;
    this.Yellow_Base.index = this.stats.baseIndexYellow;
    this.Yellow_Base.income = this.stats.baseIncome;
    //Input logic
    this.Yellow_Base.inputEnabled = true;
    this.Yellow_Base.events.onInputDown.add(this.listenerUnitSelection, this);
    this.Yellow_Base.events.onInputOver.add(this.listenerOverStructure, this);
    this.Yellow_Base.events.onInputOut.add(this.listenerOut, this);

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

hud.prototype.AllStructuresOn = function(player){ //MAKES VISIBLE ALL THE STRUCTURE INTERFACE ICONS
    if (player)
    {
        this.Red_Farm.visible = true;
        this.Red_Tower.visible = true;
        this.Red_Fortress.visible = true;
    }
    else
    {
        this.Yellow_Farm.visible = true;
        this.Yellow_Tower.visible = true;
        this.Yellow_Fortress.visible = true;
    }
}

hud.prototype.AllStructuresOff = function(){ //MAKES NOT VISIBLE ALL THE STRUCTURE INTERFACE ICONS
    this.Red_Farm.visible = false;
    this.Red_Tower.visible = false;
    this.Red_Fortress.visible = false;
    this.Yellow_Farm.visible = false;
    this.Yellow_Tower.visible = false;
    this.Yellow_Fortress.visible = false;
}

hud.prototype.listenerTurn = function(){    //NEXT TURN LOGIC
    this.MenuClick.play();
    this.selectedReset();
    this.follower.visible = false;              //Follower Visible off 
    this.currentPlayer = !this.currentPlayer;   //Swap players
    this.map.UpdateMap(this.currentPlayer);     //Updates the map
    this.map.turn ++;
    this.currentTurnText.text = this.map.turn;  //Updates the current turn text on the interface
    this.listenerClick();                       //Calls for the aproppiate click reaction
    this.updateMoney(true);
}

hud.prototype.IndicatorsOff = function(){
    for (let index = 0; index < 4; index++) {
        this.indicators[index].destroy();
    }
}
hud.prototype.listenerClick = function(){   //APROPPIATE CLICK LOGIC
    if(this.inventoryBackground.visible == true || this.indicating){   //If the inventory menus or the indicators are visible it makes them invisible
        this.inventoryBackground.visible = false;
        this.unitIcon.visible = true;
        this.structureIcon.visible = true;
        this.AllUnitsOff();
        this.AllStructuresOff();
        if(this.indicating){
            this.IndicatorsOff();
            this.indicating = false;
        }   
    }
    else{   //If not, it means that the player is trying to place some unit or structure or selecting a territory, unit or structure
        this.clickPointGlobal = this.game.input.position;  //the click position is get
        this.clickPoint = new Phaser.Point(this.clickPointGlobal.x , this.clickPointGlobal.y);                                               
        this.map.ForegroundLayer.getTileXY(this.clickPoint.x/1.8, this.clickPoint.y/1.8, this.clickPoint);  //it is translated to the tile in that position
        if(this.selected){  //If the player bought an unit / structure,
            if(this.map.PlaceUnit(this.clickPoint, this.selectedIndex, this.currentPlayer))                                         //tries to place the entity. If it succeeds,
            {
                this.follower.visible = false;                                                                  //Follower Visible off 
                if(this.currentPlayer)          {
                    this.moneyR = this.moneyR - this.selectedPrice;                                             //decreases the aproppiate amount of money to the proper player
                }                                                               

                else{
                    this.moneyY = this.moneyY - this.selectedPrice;
                }
                this.selectedReset();
                this.updateMoney(false);             
            }                 
        }
        else if (!this.indicating){   //If not it means he is selecting an unit, territory or structure
           if(this.currentPlayer){
                if (this.map.TileIndexGround(this.clickPoint) == 365)
                    if(!this.map.isMoved(this.clickPoint))
                        this.indicate(this.clickPoint);                               
           }
           else
           if (this.map.TileIndexGround(this.clickPoint) == 366)
                if(!this.map.isMoved(this.clickPoint))
                    this.indicate(this.clickPoint);
           this.selectedForAction = this.clickPoint;
        }
        
    }
}
hud.prototype.indicate = function(clickPoint){  //Creates the actions indicators of a selected unit
    if (this.map.WhatIsIt(this.clickPoint.x, this.clickPoint.y, false) == 3) {
        var point = new Phaser.Point();
        var fourPos = this.map.FourPos(this.clickPoint, this.currentPlayer);           
        point =  this.map.TileCenterPos(this.clickPoint);
        var result = this.map.TileCenterPos(this.clickPoint);
        result.setTo(point.x + 32 *  0, point.y + 32 * -1 );
        this.createIndicator(fourPos, 0, result);
        result.setTo(point.x + 32 *  1, point.y + 32 * 0 );
        this.createIndicator(fourPos, 1, result);
        result.setTo(point.x  + 32 * 0, point.y + 32 * 1 );
        this.createIndicator(fourPos, 2, result);
        result.setTo(point.x  + 32 *  -1, point.y + 32 * 0 );
        this.createIndicator(fourPos, 3, result);
        this.indicating = true;
   }
}
hud.prototype.createIndicator = function(fourPos, index, pos){//Creates the designed indicator and stores it in the 4 directions array
    switch (fourPos[index]) {
        case 0: //Not moveable to position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'nope');
            break;

        case 1: //Moveable to position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'movement');
            break;

        case 2: //Destroyable tree
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'movement');
            break;

        case 3: //Unit in position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'combat');
            break;

        default:    //Error
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'nope');
            break;
    }

    this.indicators[index].inputEnabled = true;
    this.indicators[index].events.onInputDown.add(this.listenerAction, this);
}

hud.prototype.updateMoney = function (turnEnd){    //Updates the money display and amount
    if(this.currentPlayer){
        if(turnEnd){
            this.moneyR += Math.trunc(this.map.AmountOfTiles(365) / 2); //Money earned by tiles possesion
            this.moneyR += 2;                                           //Money earned by main base
            this.moneyR += this.map.rFarms * this.stats.farmsIncome;    //Money earned by farms
            this.moneyY -= this.map.UnitsManteinance(false);            //Money spent in units manteinance
        }
        this.moneyAmount.text = this.moneyR;
    }
    else{
        if(turnEnd){
            this.moneyY += Math.trunc(this.map.AmountOfTiles(366) / 2); //Money earned by tiles possesion
            this.moneyY += 2;                                           //Money earned by main base
            this.moneyY += this.map.yFarms * this.stats.farmsIncome;    //Money earned by farms
            this.moneyR -= this.map.UnitsManteinance(true);             //Money spent in units manteinance
        }
        this.moneyAmount.text = this.moneyY;
    }   
    this.NoMoney();
}

hud.prototype.NoMoney = function(){ //Checks if someone spent all his money and if so it destoys his army
    if(this.moneyAmount.text < 0)
        this.map.DestroyArmy(this.currentPlayer);
}

hud.prototype.selectedReset = function(){   //Resets the unit/structure selection to NOT selected
    this.selectedIndex = 0;
    this.selectedPrice = 0;
    this.selected = false;
}

hud.prototype.listenerAction = function(selected){  //Process the actions of a selected unit
    
    var destination = new Phaser.Point(this.selectedForAction.x + this.indKey[this.indicators.indexOf(selected)].x, this.selectedForAction.y + this.indKey[this.indicators.indexOf(selected)].y);      

    if(selected.key == 'movement'){ //Movement logic applied to the selected unit
        if(this.map.NotDefended(this.selectedForAction, destination, this.currentPlayer))
        if(!this.map.isMoved(this.selectedForAction)){
            this.map.moveUnit(this.selectedForAction, this.indKey[this.indicators.indexOf(selected)], this.currentPlayer);
            this.IndicatorsOff();
        }
    }
    if(selected.key == 'combat'){   //Combat logic applied to the selected unit
        if(this.map.GetStrength(this.selectedForAction) >= this.map.GetStrength(destination))
        if(!this.map.isMoved(this.selectedForAction)){         
            this.map.moveUnit(this.selectedForAction, this.indKey[this.indicators.indexOf(selected)], this.currentPlayer);
            this.IndicatorsOff();
            this.map.GameOver();
        }
    }
}

hud.prototype.listenerStructure = function(){   //OPENS THE STRUCTURES INVENTORY
    this.MenuClick.play();
    this.selectedReset();
    this.follower.visible = false;              //Follower Visible off 
    this.inventoryBackground.anchor.setTo(1,1);
    this.inventoryBackground.visible = true;
    this.structureIcon.visible = false;
    this.unitIcon.visible = true;
    this.AllUnitsOff();
    this.AllStructuresOn(this.currentPlayer);
}

hud.prototype.listenerOverUnit = function(Overed, unit){  //Opens the unit stats display
    
    this.priceTxt.text = 'Price:       ' + Overed.price;
    this.strengthTxt.text = 'Strength: ' + Overed.strength;
    this.nameTxt.text = Overed.name;

    this.overBackground.x = this.game.width / 2;
    this.overBackground.visible = true;
}

hud.prototype.listenerOverStructure = function(Overed, unit){  //Opens the unit stats display
   
    this.priceTxt.text = 'Price:       ' + Overed.price;
    this.strengthTxt.text = 'Strength: ' + Overed.strength;
    this.nameTxt.text = Overed.name;

    this.overBackground.x = (this.game.width / 2) - 160;
    this.overBackground.visible = true;
}

hud.prototype.listenerOut = function(){ //Closes the unit stats display
    this.overBackground.visible = false;
}

hud.prototype.listenerUnit = function(){    //OPENS THE UNITS INVENTORY
    this.MenuClick.play();
    this.selectedReset();
    this.follower.visible = false;              //Follower Visible off 
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = true;
    this.unitIcon.visible = false;
    this.structureIcon.visible = true;
    this.AllStructuresOff();
    this.AllUnitsOn(this.currentPlayer);
}

hud.prototype.listenerUnitSelection = function (clicked){   //DETERMINATES WICH UNIT WAS SELECTED AND VERIFIES IF THERE IS ENOUGH MONEY TO BUY IT (BUY)
    
    if(this.currentPlayer)
        if(this.moneyR >= clicked.price){   //If the player has enough money yo buy the selected unit it indicates its selection
            this.follower.loadTexture(clicked.texture);
            this.follower.visible = true;
            this.select(clicked);
        }
        else
            ;
    else
        if(this.moneyY >= clicked.price){   //IDEM
            this.follower.loadTexture(clicked.texture);
            this.follower.visible = true;
            this.select(clicked);
        }
        else
        ;
}

hud.prototype.UpdateFollower = function(){  //Updates the position of the cursor follower
    if(this.selected){
        this.follower.position.set(this.game.input.worldX - this.game.input.worldX %28.8, this.game.input.worldY - this.game.input.worldY % 28.8);
    }
}

hud.prototype.select = function(clicked){   //Selects an unit/structure to buy
    this.selectedIndex = clicked.index;
    this.selected = true;
    this.selectedPrice = clicked.price;
    this.selectedStrenght = clicked.strength;
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

var music;

var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);
    this.game.load.image('logo', 'images/phaser.png');
    //load buttons
    this.game.load.image('playButton', 'resources/menu/buttons/playButton.png');
    this.game.load.image('rulesButton', 'resources/menu/buttons/rulesButton.png');
    this.game.load.image('aboutUsButton', 'resources/menu/buttons/aboutUsButton.png');
    this.game.load.image('backButton', 'resources/menu/buttons/backButton.png');
    this.game.load.image('nextButton', 'resources/menu/buttons/nextButton.png');
    this.game.load.image('menuButton', 'resources/menu/buttons/menuButton.png');
    //load images
    this.game.load.image('backgroundImage', 'resources/menu/backgroundImage.png');
    this.game.load.image('aboutUs', 'resources/menu/imageText/aboutUs.png');    
    this.game.load.image('rules1', 'resources/menu/imageText/rules1.png');
    this.game.load.image('rules2', 'resources/menu/imageText/rules2.png');
    this.game.load.image('rules3', 'resources/menu/imageText/rules3.png');
    this.game.load.image('endGame', 'resources/menu/imageText/endGame.png');
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
    this.aboutUsButton = this.game.add.button(450, 475, 'aboutUsButton', this.AboutUsStart, this, 1, 1, 0);
    this.playButton.scale.setTo(1, 1);
    this.ruleButton.scale.setTo(1, 1);
    this.aboutUsButton.scale.setTo(1, 1);
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
    this.backButton = this.game.add.button(500, 500, 'backButton', this.back, this, 1, 1, 0);
    this.backButton.scale.setTo(0.8, 0.8);
  },
  back:function(){
    this.game.state.start('MainMenu');
  }
};

var HowToPlayScene={
  create:function(){
    this.HowToPlayImage = this.game.add.image(0, 0, 'rules1');
    this.nextButton = this.game.add.button(590, 530, 'nextButton', this.next, this, 1, 1, 0);
    this.nextButton.scale.setTo(0.8, 0.8);
    this.HowToPlayImage.scale.setTo(0.66, 0.9);
  },
  next:function(){
    this.game.state.start('HowToPlay2');
  }
};

var HowToPlayScene2={
  create:function(){
    this.HowToPlayImage2 = this.game.add.image(0, 0, 'rules2');
    this.nextButton = this.game.add.button(590, 530, 'nextButton', this.next, this, 1, 1, 0);
    this.nextButton.scale.setTo(0.8, 0.8);
    this.HowToPlayImage2.scale.setTo(0.68, 0.95);
  },
  next:function(){
    this.game.state.start('HowToPlay3');
  }
};

var HowToPlayScene3={
  create:function(){
    this.HowToPlayImage3 = this.game.add.image(0, 0, 'rules3');
    this.backButton = this.game.add.button(675, 510, 'backButton', this.back, this, 1, 1, 0);
    this.backButton.scale.setTo(0.8, 0.8);
    this.HowToPlayImage3.scale.setTo(0.7, 0.95);
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
  game.state.add('EndGame', EndOfGame);
  game.state.add('AboutUs', AboutUsScene);

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
    this.rFarms = 0;
    this.yFarms = 0;
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

    for (let index1 = 0; index1 < this.map.height; index1++)
        for (let index2 = 0; index2 < this.map.width; index2++) 
            this.unitsArray[index1][index2] = -1;

    this.unitsArray[7][5] = new unit (-20);
    this.unitsArray[11][22] = new unit (-10);
};

map.prototype.createUnit = function(x,y,unitType){
    this.unitsArray[y][x] = new unit (unitType);
};

map.prototype.AmountOfTiles = function (index){
    var count = 0;
    for (let indexw = 0; indexw < this.map.width; indexw++) {
        for (let indexh = 0; indexh < this.map.height; indexh++) { 
            if (this.map.getTile(indexw,indexh,this.GroundLayer, true).index == index) {
                count ++;
            }
        }        
    }
    return count;
}
map.prototype.UpdateMap = function(currentPlayer) {
    this.UpdateTrees();
    this.resetUnits();
};

map.prototype.GameOver = function(){
    console.log(this.map.getTile(5,7,this.ForegroundLayer,true).index + " / " + this.map.getTile(22,11,this.ForegroundLayer,true).index);
    if  (this.map.getTile(5,7,this.ForegroundLayer,true).index != 48 || this.map.getTile(22,11,this.ForegroundLayer,true).index != 45) //Red wins || Yellow wins
        this.game.state.start('EndGame');
}

map.prototype.DestroyArmy = function(player){
    for (let index1 = 0; index1 < this.map.height; index1++)
        for (let index2 = 0; index2 < this.map.width; index2++){
            if(this.unitsArray[index1][index2] != -1){
                if(this.unitsArray[index1][index2].player == player)
                if(this.stats.IsUnit(this.map.getTile(index2, index1, this.ForegroundLayer, true).index)){
                    this.unitsArray[index1][index2] = -1;
                    this.map.removeTile(index2,index1,this.ForegroundLayer);
                }        
            }          
        }
}

            

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

map.prototype.nearAlliedTerritory = function(point, currentPlayer) {    //Check if near the given point are there any allied tiles
    if(currentPlayer){  //Red player
        if(this.map.getTile(point.x -1, point.y, this.GroundLayer,true).index == 365)
            return true;
        if(this.map.getTile(point.x , point.y -1, this.GroundLayer,true).index == 365)
            return true;
        if(this.map.getTile(point.x , point.y +1, this.GroundLayer,true).index == 365)
            return true;
        if(this.map.getTile(point.x +1, point.y, this.GroundLayer,true).index == 365)
            return true;
        return false;
    }
    else{   //Yellow player
        if(this.map.getTile(point.x -1, point.y, this.GroundLayer,true).index == 366)
            return true;
        if(this.map.getTile(point.x , point.y -1, this.GroundLayer,true).index == 366)
            return true;
        if(this.map.getTile(point.x , point.y +1, this.GroundLayer,true).index == 366)
            return true;
        if(this.map.getTile(point.x +1, point.y, this.GroundLayer,true).index == 366)
            return true;
        return false;
    }
    
}

map.prototype.PlaceUnit = function(clickPoint, type, currentPlayer){
    this.placed = false;
    this.teamTile = this.map.getTile(clickPoint.x, clickPoint.y, this.GroundLayer,true).index;      //Coloured tile under entity
    this.entity = this.map.getTile(clickPoint.x, clickPoint.y,this.ForegroundLayer,true).index;     //Entity selected
    this.terrain = this.map.getTile(clickPoint.x, clickPoint.y,this.BackgroundLayer,true).index;    //Terrain
   
    if(!this.stats.IsUnit(type))  //If it is an structure
    {
        if(currentPlayer)               //If red player
        {
            if(this.teamTile == 365)    //If it is a red territory
            {
                this.placed = this.freeThenPlace(clickPoint, type, currentPlayer);    //Place?
            }  
        }    
        else                            //If yellow player
         {
            if(this.teamTile == 366)    //If it is a yellow territory
            {
                this.placed = this.freeThenPlace(clickPoint, type, currentPlayer);    //Place?
            }
         }
        if(this.placed) //If the structure was placed and it is a farm, it is added to the farms count
        {
            if(type == this.stats.farmIndexRed)
                this.rFarms ++;
            else if(type == this.stats.farmIndexYellow)
                this.yFarms ++;
        }
    }
    else{
        //(this.nearAlliedTerritory(clickPoint, currentPlayer)) //If near to allied territory
        //{
            this.placed = this.freeThenPlace(clickPoint, type, currentPlayer);
            if(this.placed)
                this.unitsArray[clickPoint.y][clickPoint.x].moved = true;
        //}
    }
    return this.placed;    
}

map.prototype.freeThenPlace = function(clickPoint, type, currentPlayer){
    if(this.terrain == 3 || this.terrain == 1) //Es hierba
        if(this.entity == -1){ //Nada ocupado
            if (currentPlayer) 
            this.map.putTile(365,clickPoint.x,clickPoint.y,this.GroundLayer);
        
            else
            this.map.putTile(366,clickPoint.x,clickPoint.y,this.GroundLayer);
    
            this.createUnit(clickPoint.x,clickPoint.y,type);
            this.map.putTile(type, clickPoint.x, clickPoint.y, this.ForegroundLayer);
            return true;
        }
        return false;
    }

map.prototype.isMoved = function (point){
    if (this.unitsArray[point.y][point.x].moved)
        return true
    else
        return false;        
}

map.prototype.resetUnits = function (){
    for (let index1 = 0; index1 < this.map.height; index1++)
        for (let index2 = 0; index2 < this.map.width; index2++) 
            if(this.unitsArray[index1][index2] != -1)
                this.unitsArray[index1][index2].moved = false;
}

map.prototype.moveUnit = function(clickPoint, destination, currentPlayer){
    this.map.putTile(this.map.getTile(clickPoint.x,clickPoint.y,this.ForegroundLayer,true).index,clickPoint.x + destination.x, clickPoint.y + destination.y, this.ForegroundLayer);
    this.map.removeTile(clickPoint.x,clickPoint.y,this.ForegroundLayer);
    if (currentPlayer){
        this.map.putTile(365,clickPoint.x + destination.x,clickPoint.y + destination.y,this.GroundLayer);
    }

    else{
        this.map.putTile(366,clickPoint.x + destination.x,clickPoint.y + destination.y,this.GroundLayer);
    }

    this.unitsArray[clickPoint.y + destination.y][clickPoint.x + destination.x] = this.unitsArray[clickPoint.y][clickPoint.x];
    this.unitsArray[clickPoint.y][clickPoint.x] = -1;
    this.unitsArray[clickPoint.y + destination.y][clickPoint.x + destination.x].moved = true;
}

map.prototype.NotDefended = function (selectedPoint ,destinationPoint, currentPlayer){
    var defenderStrength = 0;

    defenderStrength = this.Tower(destinationPoint.x, destinationPoint.y - 1, currentPlayer)
    if(defenderStrength != -1)
        if(this.GetStrength(selectedPoint) < defenderStrength)
            return false;
    defenderStrength = this.Tower(destinationPoint.x + 1, destinationPoint.y, currentPlayer)
    if(defenderStrength != -1)
        if(this.GetStrength(selectedPoint) < defenderStrength)
            return false;
    defenderStrength = this.Tower(destinationPoint.x, destinationPoint.y + 1, currentPlayer)
    if(defenderStrength != -1)
        if(this.GetStrength(selectedPoint) < defenderStrength)
            return false;
    defenderStrength = this.Tower(destinationPoint.x - 1, destinationPoint.y, currentPlayer)
    if(defenderStrength != -1)
        if(this.GetStrength(selectedPoint) < defenderStrength)
            return false;
    
    return true;
}

map.prototype.Tower = function (x,y, currentPlayer){
    if(currentPlayer){
        if(this.map.getTile(x, y, this.ForegroundLayer, true).index == this.stats.towerIndexYellow)
            return this.stats.towerStrength;
        else if(this.map.getTile(x, y, this.ForegroundLayer, true).index == this.stats.fortressIndexYellow)
            return this.stats.fortressStrength;
        else
            return -1;
    }
    else{
        if(this.map.getTile(x, y, this.ForegroundLayer, true).index == this.stats.towerIndexRed)
            return this.stats.towerStrength;
        else if(this.map.getTile(x, y, this.ForegroundLayer, true).index == this.stats.fortressIndexRed)
            return this.stats.fortressStrength;
        else
            return -1;
    }
}

map.prototype.FourPos = function (pos, currentPlayer){ //Return an array with the entities on the four direction around a given position
    var fourPos = [0,0,0,0];    //Top, right , down, left
        fourPos [0] = this.WhatIsIt(pos.x, pos.y - 1,true, currentPlayer);
        fourPos [1] = this.WhatIsIt(pos.x + 1, pos.y,true, currentPlayer);
        fourPos [2] = this.WhatIsIt(pos.x, pos.y + 1,true, currentPlayer);
        fourPos [3] = this.WhatIsIt(pos.x - 1, pos.y,true, currentPlayer);
    return fourPos;
}

map.prototype.UnitsManteinance = function(currentPlayer){
    var totalManteinance = 0;

        for (let index1 = 0; index1 < this.map.height; index1++)
        for (let index2 = 0; index2 < this.map.width; index2++) 
            if(this.unitsArray[index1][index2] != -1)
                if(this.unitsArray[index1][index2].player == currentPlayer)
                    totalManteinance += this.unitsArray[index1][index2].maintenance;
    return totalManteinance;
}

map.prototype.WhatIsIt = function (x,y,enemy,currentPlayer){
    var backElem = this.map.getTile(x, y, this.BackgroundLayer, true).index;
    if(backElem != 3 && backElem != 1)  //Beach or water   (Out of game zone)
        return 0;

    else{                               //Inside game zone
        var foreElem = this.map.getTile(x, y, this.ForegroundLayer, true).index;
        if(enemy){
            if (foreElem == 5) //Tree
            return 2;
        else if (foreElem == -1)                //Vacío
            return 1;
        else if(this.stats.IsEnemyUnit(foreElem, currentPlayer) || this.stats.IsEnemyStructure(foreElem, currentPlayer))
                return 3;
        else
            return 0;
        }

        else{
            if (foreElem == 5) //Tree
            return 2;
        else if (foreElem == -1)  //Vacío
            return 1;
        else if(this.stats.IsUnit(foreElem))
            return 3;
        else
            return 0;
        }   
    }
}

map.prototype.GetStrength = function(position){   
    return this.unitsArray[position.y][position.x].strenght;
}

map.prototype.TileIndexGround = function(point){
    return this.map.getTile(point.x, point.y, this.GroundLayer, true).index;
}


map.prototype.TileCenterPos = function(point){
    var pointCenter = new Phaser.Point();
    var tile =  this.map.getTile(point.x, point.y, this.BackgroundLayer);
    pointCenter.x = tile.worldX * 1.8;
    pointCenter.y = tile.worldY * 1.8;
    return pointCenter;
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

},{"./Hud.js":1,"./map.js":3,"./stats.js":5}],5:[function(require,module,exports){
'use strict';

//"stats" CONTAINS THE ENTITIES AND OTHER GAME STATS THAT AFFECTS ITS BEHAVIOUR

var stats = function(){

//Memory
this.unitsInGame = [255,262,121,128,122,129,123,130];
this.redUnitsInGame = [255, 121, 122, 123];
this.yellowUnitsInGame = [262, 128, 129, 130];
this.redStructuresInGame = [24, 31, 45, 17];
this.yellowStructuresInGame = [27, 34, 48, 43];

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

// STRUCTURES
    this.farmLife = 5;  //FARM
    this.farmPrice = 5;
    this.farmStrength = 5;
    this.farmsIncome = 8;
    this.farmIndexRed = 17;
    this.farmIndexYellow = 43;
    this.farmName = "Farm";
    
    this.towerLife = 10;  //TOWER
    this.towerPrice = 10;
    this.towerStrength = 20;
    this.towerIndexRed = 24;
    this.towerIndexYellow = 27;
    this.towerName = "Tower";

    this.fortressLife = 15;  //FORTRESS
    this.fortressPrice = 15;
    this.fortressStrength = 25;
    this.fortressIndexRed = 31;
    this.fortressIndexYellow = 34;
    this.fortressName = "Fortress";

    this.baseLife = 20;  //BASE
    this.baseIndexRed = 45;
    this.baseIndexYellow = 48;
    this.baseName = "Base";

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

stats.prototype.IsEnemyUnit = function(x, currentPlayer){
    var i = 0;
   if(currentPlayer){
        while(i < this.yellowUnitsInGame.length && x != this.yellowUnitsInGame[i])
            i++;
        if(i == this.yellowUnitsInGame.length)
            return false;
        else
            return true;
   }

   else{
        while(i < this.redUnitsInGame.length && x != this.redUnitsInGame[i])
            i++;
        if(i == this.redUnitsInGame.length)
            return false;
        else
            return true;
   }   
}

stats.prototype.IsEnemyStructure = function(x,currentPlayer){
    var i = 0;
   if(currentPlayer){
        while(i < this.yellowStructuresInGame.length && x != this.yellowStructuresInGame[i])
            i++;
        if(i == this.yellowStructuresInGame.length)
            return false;
        else
            return true;
   }

   else{
        while(i < this.redStructuresInGame.length && x != this.redStructuresInGame[i])
            i++;
        if(i == this.redStructuresInGame.length)
            return false;
        else
            return true;
   }   
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
    this.moved = false;
    
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
    else if(type == this.stats.farmIndexRed)
        this.Farm(true);
    else if(type == this.stats.farmIndexYellow)
        this.Farm(false);
    else if(type == this.stats.towerIndexRed)
        this.Tower(true);
    else if(type == this.stats.towerIndexYellow)
        this.Tower(false);
    else if(type == this.stats.fortressIndexRed)
        this.Fortress(true);
    else if(type == this.stats.fortressIndexYellow)
        this.Fortress(false);
    else if(type == -10)
        this.Base(true);
    else if(type == - 20)
        this.Base(false);
}

unit.prototype.HasMoney = function(money){
    return money >= this.price;
}

unit.prototype.Peasant = function(player){  //PEASANT
    this.name = this.stats.peasantName;
    this.life = this.stats.peasantLife;
    this.strenght = this.stats.peasantStrength;
    this.price = this.stats.peasantPrice;
    this.maintenance = this.stats.peasantMaintenance;
    this.player = player;
}

unit.prototype.Lancer = function(player){   //LANCER
    this.name = this.stats.lancerName;
    this.life = this.stats.lancerLife;
    this.strenght = this.stats.lancerStrength;
    this.price = this.stats.lancerPrice;
    this.maintenance = this.stats.lancerMaintenance;
    this.player = player;

}

unit.prototype.Swordman = function(player){ //SWORDMAN
    this.name = this.stats.swordmanName;
    this.life = this.stats.swordmanLife;
    this.strenght = this.stats.swordmanStrength;
    this.price = this.stats.swordmanPrice;
    this.maintenance = this.stats.swordmanMaintenance;
    this.player = player;

}

unit.prototype.Horseman = function(player){ //HORSEMAN
    this.name = this.stats.horsemanName;
    this.life = this.stats.horsemanLife;
    this.strenght = this.stats.horsemanStrength;
    this.price = this.stats.horsemanPrice;
    this.maintenance = this.stats.horsemanMaintenance;
    this.player = player;

}

unit.prototype.Farm = function(player){ //FARM
    this.name = this.stats.farmName;
    this.life = this.stats.farmLife;
    this.strenght = this.stats.farmStrength;
    this.price = this.stats.farmPrice;
    this.maintenance = 0;
    this.player = player;
}

unit.prototype.Tower = function(player){ //TOWER
    this.name = this.stats.towerName;
    this.life = this.stats.towerLife;
    this.strenght = this.stats.towerStrength;
    this.price = this.stats.towerPrice;
    this.maintenance = 0;
    this.player = player;

}

unit.prototype.Fortress = function(player){ //FORTRESS
    this.name = this.stats.fortressName;
    this.life = this.stats.fortressLife;
    this.strenght = this.stats.fortressStrength;
    this.price = this.stats.fortressPrice;
    this.maintenance = 0;
    this.player = player;

}

unit.prototype.Base = function(player){
    this.name = this.stats.baseName;
    this.life = this.stats.baseLife;
    this.strenght = 0;
    this.maintenance = 0;
    this.player = player;
}

module.exports = unit;
},{"./stats.js":5}]},{},[2]);
