'use strict';

//"stats" CONTAINS THE ENTITIES AND OTHER GAME STATS THAT AFFECTS ITS BEHAVIOUR

var stats = function(){

//GAMEPLAY
this.treeGrowRatio          = 0.15; // [0, 1] Probabilidad de que aparezca un nuevo árbol

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

}

module.exports = stats;