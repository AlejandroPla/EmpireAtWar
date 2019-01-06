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
    this.selectedStrenght = 0
    this.selectedForAction = new Phaser.Point();
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
    this.follower.visible = false;              //Follower Visible off 
    this.currentPlayer = !this.currentPlayer;   //Swap players
    this.map.UpdateMap(this.currentPlayer);     //Updates the map
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
    if (this.map.WhatIsIt(this.clickPoint.x, this.clickPoint.y) == 3) {
        var point = new Phaser.Point();
        var fourPos = this.map.FourPos(this.clickPoint);           
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
hud.prototype.createIndicator = function(fourPos, index, pos){
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
            this.moneyR += Math.trunc(this.map.AmountOfTiles(365) / 2);
            this.moneyR += 2;
            this.moneyR += this.map.rFarms * this.stats.farmsIncome;
        }
        this.moneyAmount.text = this.moneyR;
    }
    else{
        if(turnEnd){
            this.moneyY += Math.trunc(this.map.AmountOfTiles(366) / 2);
            this.moneyY += 2;
            this.moneyY += this.map.yFarms * this.stats.farmsIncome;
        }
        this.moneyAmount.text = this.moneyY;
    }
}

hud.prototype.selectedReset = function(){   //Resets the unit/structure selection to NOT selected
    this.selectedIndex = 0;
    this.selectedPrice = 0;
    this.selected = false;
}

hud.prototype.listenerAction = function(selected){  //Process the actions of a selected unit
    if(selected.key == 'movement'){
        if(!this.map.isMoved(this.selectedForAction)){
            this.map.moveUnit(this.selectedForAction, this.indKey[this.indicators.indexOf(selected)], this.currentPlayer);
            this.IndicatorsOff();
        }
    }
    if(selected.key == 'combat'){
        // falta condicion del nivel de ataque
        if(!this.map.isMoved(this.selectedForAction){
            this.map.moveUnit(this.selectedForAction, this.indKey[this.indicators.indexOf(selected)], this.currentPlayer);
            this.IndicatorsOff();
        }
    }
}

hud.prototype.listenerStructure = function(){   //OPENS THE STRUCTURES INVENTORY
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
    this.selectedIndex = clicked.index;
    this.selected = true;
    this.selectedPrice = clicked.price;
    this.selectedStrenght = clicked.strength;
    this.listenerClick();
}

module.exports = hud;