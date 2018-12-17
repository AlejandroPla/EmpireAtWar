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
//Indicators
this.indicators = new Array(4);
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
        this.clickPointGlobal = this.game.input.position;  //the click position is get
        this.clickPoint = new Phaser.Point(this.clickPointGlobal.x , this.clickPointGlobal.y);                                               
        this.map.ForegroundLayer.getTileXY(this.clickPoint.x/1.8, this.clickPoint.y/1.8, this.clickPoint);  //it is translated to the tile in that position
        console.log("tile: " + this.clickPoint);
        console.log("global: " + this.clickPointGlobal);
        if(this.selected){  //If the player bought an unit / structure,
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
           }
        }
        
    }
}

hud.prototype.createIndicator = function(fourPos, index, pos){
    switch (fourPos[index]) {
        case 0: //Not moveable to position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'nope')
            break;

        case 1: //Moveable to position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'movement')
            break;

        case 2: //Destroyable tree
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'movement')
            break;

        case 3: //Unit in position
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'combat')
            break;

        default:    //Error
        this.indicators[index] = this.game.add.image(pos.x, pos.y, 'nope')
            break;
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