'use strict';

var hud = function(game, map){
    this.game = game;
    this.map = map;
    this.currentPlayer = false;

    //Inventory images
    this.inventoryBackground = game.add.image( this.game.width / 2, this.game.height *0.98, 'inventoryBackground');
    this.inventoryBackground.height = this.inventoryBackground.height * 0.80;
    this.inventoryBackground.anchor.setTo(0,1);
    this.inventoryBackground.visible = false;

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
}

hud.prototype.listenerTurn = function(){    //Next Turn!
    this.currentPlayer = !this.currentPlayer;
    this.map.UpdateMap(this.currentPlayer);
    this.currentTurnText.text = this.map.turn;
}

hud.prototype.listenerStructure = function(){   //Structures inventory
    

}

hud.prototype.listenerUnit = function(){    //Units inventory
    this.inventoryBackground.visible = true;
    this.unitIcon.visible = false;
    if(this.currentPlayer){ //RED player
            
    }
}

module.exports = hud;