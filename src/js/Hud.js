'use strict';

var hud = function(game, map){
    this.game = game;
    this.map = map;
    this.currentPlayer = false;

    //Reset click
    this.resetClickArea = game.add.sprite(0,0,'empty');
    this.resetClickArea.height = this.game.height;
    this.resetClickArea.width = this.game.width;
        //Input logic
        this.resetClickArea.inputEnabled = true;
        this.resetClickArea.events.onInputDown.add(this.listenerReset, this);

    //Inventory images
    this.inventoryBackground = game.add.image( this.game.width / 2, this.game.height *0.98, 'inventoryBackground');
    //this.inventoryBackground.height = this.inventoryBackground.height * 0.80;
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = false;
    this.inventoryBackground.inputEnabled = true;

    //Turn Text
    this.turnText = game.add.text(this.game.width - this.game.width * 0.10, 0.01 * this.game.height, 'Turn: ')
    this.turnText.anchor.setTo(1,0);
    this.turnText.fontSize = 30;
    this.currentTurn = this.map.turn;
    this.currentTurnText = game.add.text((this.game.width - this.game.width * 0.10)+ 45, 0.01 * this.game.height, this.currentTurn);
    this.currentTurnText.anchor.setTo(1,0);
    this.currentTurnText.fontSize =  30;

    //nextTurnIcon
    this.nextTurnIcon = this.game.add.sprite(this.game.width, this.game.height, 'nextTurnIcon');
    this.nextTurnIcon.scale.setTo(0.15);
    this.nextTurnIcon.anchor.setTo(1,1);
        //Input logic
        this.nextTurnIcon.inputEnabled = true;  
        this.nextTurnIcon.events.onInputDown.add(this.listenerTurn, this);

    //structureIcon
    this.structureIcon = this.game.add.sprite(this.game.width / 2 - (this.game.width * 0.05), this.game.height - this.game.height * 0.02, 'structureIcon');
    this.structureIcon.anchor.setTo(1,1);
    this.structureIcon.scale.setTo(0.10);
        //Input logic
        this.structureIcon.inputEnabled = true;  
        this.structureIcon.events.onInputDown.add(this.listenerStructure, this);

    //unitIcon
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
        this.Red_Peasant = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 , this.game.height * 0.98 - this.heightPaddle, 'Red_Peasant');
        this.Red_Peasant.anchor.setTo(0,1);
        this.Red_Peasant.scale.setTo(2);
        this.Red_Peasant.visible = false;

        this.Red_Lancer = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Red_Lancer');
        this.Red_Lancer.anchor.setTo(0,1);
        this.Red_Lancer.scale.setTo(2);
        this.Red_Lancer.visible = false;

        this.Red_Swordman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Red_Swordman');
        this.Red_Swordman.anchor.setTo(0,1);
        this.Red_Swordman.scale.setTo(2);
        this.Red_Swordman.visible = false;

        this.Red_Horseman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Red_Horseman');
        this.Red_Horseman.anchor.setTo(0,1);
        this.Red_Horseman.scale.setTo(2);
        this.Red_Horseman.visible = false;

        //UNITS (YELLOW)
        this.Yellow_Peasant = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Peasant');
        this.Yellow_Peasant.anchor.setTo(0,1);
        this.Yellow_Peasant.scale.setTo(2);
        this.Yellow_Peasant.visible = false;

        this.Yellow_Lancer = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Lancer');
        this.Yellow_Lancer.anchor.setTo(0,1);
        this.Yellow_Lancer.scale.setTo(2);
        this.Yellow_Lancer.visible = false;

        this.Yellow_Swordman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*2 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Swordman');
        this.Yellow_Swordman.anchor.setTo(0,1);
        this.Yellow_Swordman.scale.setTo(2);
        this.Yellow_Swordman.visible = false;

        this.Yellow_Horseman = this.game.add.sprite(this.game.width / 2 + this.widthPaddle1 + this.widthPaddle*3 , this.game.height * 0.98 - this.heightPaddle, 'Yellow_Horseman');
        this.Yellow_Horseman.anchor.setTo(0,1);
        this.Yellow_Horseman.scale.setTo(2);
        this.Yellow_Horseman.visible = false;
}

hud.prototype.AllUnitsOn = function(player){
    console.log("All units ON");
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

hud.prototype.AllUnitsOff = function(){
    console.log("All units OFF");
        this.Red_Peasant.visible = false;
        this.Red_Lancer.visible = false;
        this.Red_Swordman.visible = false;
        this.Red_Horseman.visible = false;
        this.Yellow_Peasant.visible = false;
        this.Yellow_Lancer.visible = false;
        this.Yellow_Swordman.visible = false;
        this.Yellow_Horseman.visible = false;
}

hud.prototype.listenerTurn = function(){    //Next Turn!
    this.currentPlayer = !this.currentPlayer;
    this.map.UpdateMap(this.currentPlayer);
    this.currentTurnText.text = this.map.turn;
    this.listenerReset();
}

hud.prototype.listenerReset = function(){   //Reset status
    if(this.inventoryBackground.visible == true){
        this.inventoryBackground.visible = false;
        this.unitIcon.visible = true;
        this.structureIcon.visible = true;
        this.AllUnitsOff();
    }
}

hud.prototype.listenerStructure = function(){   //Structures inventory
    this.inventoryBackground.anchor.setTo(1,1);
    this.inventoryBackground.visible = true;
    this.structureIcon.visible = false;
    this.unitIcon.visible = true;
    this.AllUnitsOff();
}

hud.prototype.listenerUnit = function(){    //Units inventory
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = true;
    this.unitIcon.visible = false;
    this.structureIcon.visible = true;

    this.AllUnitsOn(this.currentPlayer);
}

module.exports = hud;