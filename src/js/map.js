'use strict';
var unit = require("./units.js");

var map = function(game, stats){
    this.game = game;
    this.stats = stats;
    this.map = this.game.add.tilemap('level_01');
    this.map.addTilesetImage('Tile-set');
    this.BackgroundLayer = this.map.createLayer("Background");
    this.ForegroundLayer = this.map.createLayer("Foreground");
    //Array de unidades
    this.unitsArray = new Array(this.map.height);
    this.createUnitsArray();
    //Scale
    this.BackgroundLayer.scale.set(1.8);
    this.ForegroundLayer.scale.set(1.8);
    this.BackgroundLayer.resizeWorld();
    this.ForegroundLayer.resizeWorld();


    //AUX
    this.turn = 0;
};

map.prototype.createUnitsArray = function(){
    for (let index = 0; index < this.unitsArray.length; index++) {
        this.unitsArray[index] = new Array(this.map.width);
    }
};

map.prototype.creatUnit = function(x,y,unitType){
    this.unitsArray[y][x] = new unit (unitType);
};

map.prototype.StuffCounter = function(currentPlayer)
{
    this.turn++;
    console.log("CURRENT GAME STATUS INFO (" + this.turn + "): ");

      var treeCount = 0;
      var mountainCount = 0;
      for(var y = 0; y < this.map.height; y ++){
        for(var x = 0; x < this.map.width; x ++){
           if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 5)
           treeCount++;
           else if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 11)
           mountainCount++;
        }
      }
      console.log("Árbol: " + treeCount);
      console.log("Montaña: " + mountainCount);
    if(currentPlayer)
        console.log("Current player = RED");
    else
    console.log("Current player = YELLOW");
};

map.prototype.UpdateMap = function(currentPlayer) {
    this.UpdateTrees();
    this.StuffCounter(currentPlayer);
};

map.prototype.UpdateTrees = function(){

    for(var y = 0; y < this.map.height; y ++){
        for(var x = 0; x < this.map.width; x ++){
           if(this.map.getTile(x,y, this.ForegroundLayer,true).index == 5)  //Si es árbol
           {
                if(Math.random() < 0.15)  //Probabilidad de que aparezca otro árbol
                {
                    var newTreePosX = 0;
                    var newTreePosY = 0;
                    var rnd = Math.random();

                    if(rnd <= 0.25){
                        newTreePosY = -1;   //Arriba
                    }
                    else if(rnd <= 0.5){
                        newTreePosY =  1;    //Abajo
                    }
                    else if(rnd <= 0.75){
                        newTreePosX = - 1;    //Izquierda
                    }
                    else{                        
                        newTreePosX = 1;     //Derecha
                    }

                    var nextPosElem = this.map.getTile(x + newTreePosX , y + newTreePosY, this.BackgroundLayer,true).index;

                    if( nextPosElem == 3) //Es hierba sin nada encima
                    {
                        if(this.map.getTile(x + newTreePosX , y + newTreePosY, this.ForegroundLayer,true).index == -1)
                        {
                            this.map.putTile(5, x + newTreePosX, y + newTreePosY, this.ForegroundLayer);    //Convierte en árbol
                        }
                    }
                }
           }
        }
    }
}
map.prototype.PlaceUnit = function(clickPoint, type){

    this.placed = false;

    if(this.map.getTile(clickPoint.x, clickPoint.y, this.BackgroundLayer,true).index == 3 || this.map.getTile(clickPoint.x, clickPoint.y, this.BackgroundLayer,true).index == 1){ //Es hierba
        if(this.map.getTile(clickPoint.x, clickPoint.y,this.ForegroundLayer,true).index == -1){ //Nada ocupado
        
            this.placed = true;
            this.creatUnit(clickPoint.x,clickPoint.y,type);
            this.map.putTile(type, clickPoint.x, clickPoint.y, this.ForegroundLayer);
            console.log(this.unitsArray[clickPoint.y][clickPoint.x].name + " placed at " + clickPoint.x + "/" + clickPoint.y);  //Console info
        }
            
    }
    else
    ;
    return this.placed;    
}

module.exports = map;