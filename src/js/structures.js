'use strict';

//"units" CREATES THE UNITS ENTITIES OF THE GAME BY USING THE STATS FROM "stats"

var stats = require("./stats.js");

//Player logic color representation
//RED = true - YELLOW = false

var structure = function(type){ 

    this.stats = new stats();

    if(type == this.stats.farmIndexRed)                                     
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
    else if(type == this.stats.baseIndexRed)
        this.Base(true);
    else if(type == this.stats.baseIndexYellow)
        this.Base(false);
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

structure.prototype.Farm = function(player){  //FARM
    this.name = this.stats.farmName;
    this.life = this.stats.farmLife;
    this.income = this.stats.farmIncome;
    this.price = this.stats.farmPrice;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

structure.prototype.Tower = function(player){   //TOWER
    this.name = this.stats.towerName;
    this.life = this.stats.towerLife;
    this.defence = this.stats.towerDefence;
    this.price = this.stats.towerPrice;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

structure.prototype.Fortress = function(player){ //FORTRESS
    this.name = this.stats.fortressName;
    this.life = this.stats.fortressLife;
    this.defence = this.stats.fortressDefence;
    this.price = this.stats.fortressPrice;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

structure.prototype.Base = function(player){ //BASE
    this.name = this.stats.baseName;
    this.life = this.stats.baseLife;
    this.income = this.stats.baseIncome;

    if (player == "RED")
        this.player = true;
    else
        this.player = false;
}

module.exports = structure;