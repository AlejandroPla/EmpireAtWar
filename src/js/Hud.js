'use strict';
//var map = require("./map.js");

var hud = function(game, map){
    this.game = game;
    this.map = map;

    //nextTurnIcon
    this.nextTurnIcon = this.game.add.sprite(this.game.width, this.game.height, 'nextTurnIcon');
    this.nextTurnIcon.scale.setTo(0.15);
    this.nextTurnIcon.anchor.setTo(1,1);
        //Input logic
        this.nextTurnIcon.inputEnabled = true;  
        this.nextTurnIcon.events.onInputDown.add(listenerTurn, this);

    //structureIcon
    this.structureIcon = this.game.add.sprite(this.game.width / 2 - (this.game.width * 0.05), this.game.height - this.game.height * 0.02, 'structureIcon');
    this.structureIcon.anchor.setTo(1,1);
    this.structureIcon.scale.setTo(0.10);
        //Input logic
        this.structureIcon.inputEnabled = true;  
        this.structureIcon.events.onInputDown.add(listenerStructure, this);

    //unitIcon
    this.unitIcon = this.game.add.sprite(this.game.width / 2 + (this.game.width * 0.05), this.game.height - this.game.height * 0.02, 'unitIcon');
    this.unitIcon.anchor.setTo(0,1);
    this.unitIcon.scale.setTo(0.10);
        //Input logic
        this.unitIcon.inputEnabled = true;  
        this.unitIcon.events.onInputDown.add(listenerUnit, this);
}

function listenerTurn (){
    console.log("Next turn");
    //this.map.UpdateMap();
}

function listenerStructure(){
    console.log("Structures inventory");
}

function listenerUnit(){
    console.log("Units inventory");
}

module.exports = hud;