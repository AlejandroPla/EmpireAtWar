'use strict';

//"stats" CONTAINS THE ENTITIES AND OTHER GAME STATS THAT AFFECTS ITS BEHAVIOUR

var stats = function(){

//Memory
this.unitsInGame = [255,262,121,128,122,129,123,130];
this.redUnitsInGame = [255, 121, 122, 123];
this.yellowUnitsInGame = [262, 128, 129, 130];
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

// STRUCTURES
    this.farmLife = 5;  //FARM
    this.farmPrice = 5;
    this.farmStrength = 5;
    this.farmsIncome = 10;
    this.farmIndexRed = 17;
    this.farmIndexYellow = 43;
    this.farmName = "Farm";
    
    this.towerLife = 10;  //TOWER
    this.towerPrice = 10;
    this.towerStrength = 15;
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
    this.baseIncome = 10;
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

module.exports = stats;