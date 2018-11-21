'use strict';

var unit = function(type){                              //RED = true
    if(type == 255)                                     //YELLOW = false
        this.Peasant(true);   
}

unit.prototype.Peasant = function(player){
    this.life = 5;
    this.strenght = 10;
    this.price = 5;
    this.maintenance = 5;
    if (player == "RED")
        this.player = true;
    else
        this.player = false;

}

unit.prototype.Lancer = function(player){
    this.life = 10;
    this.strenght = 15;
    this.price = 10;
    this.maintenance = 10;
    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

unit.prototype.Swordman = function(player){
    this.life = 15;
    this.strenght = 20;
    this.price = 15;
    this.maintenance = 15;
    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

unit.prototype.Horseman = function(player){
    this.life = 20;
    this.strenght = 25;
    this.price = 20;
    this.maintenance = 20;
    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

module.exports = unit;