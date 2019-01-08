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