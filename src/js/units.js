'use strict';

var vector2D = require ('./vector2D.js');

class units {
    constructor(type){
        if (type == 0) //campesino
        {
            this.life = 10;
            this.strenght = 5;
            this.price = 10;
            this.maintenance = 8;
            this.vector2D = vector2D;
        }
        else if (type == 1) //lancero
        {
            this.life = 15;
            this.strenght = 10;
            this.price = 15;
            this.maintenance = 12;
            this.vector2D = vector2D;
        }
        else if (type == 3) //caballero
        {
            this.life = 20;
            this.strenght = 15;
            this.price = 20;
            this.maintenance = 15;
            this.vector2D = vector2D;
        }
        else if (type == 4) //rey
        {
            this.life = 25;
            this.strenght = 20;
            this.price = 25;
            this.maintenance = 18;
            this.vector2D = vector2D;
        }
        else //ninguna
        {
            
        }
    }
}