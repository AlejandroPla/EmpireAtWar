'use strict';

var vector2D = require ('./vector2D.js');

class structure{
    constructor(type)
    {
        if (type == 0) //base
        {
            this.price = 20;
            this.income = 25;
            this.life = 20;
            this.vector2D = vector2D;
        }
        else if(type == 1) //granja
        {
            this.price = 10;
            this.income = 15;
            this.life = 12;
            this.vector2D = vector2D;
        }
        else if(type == 2) //torre
        {
            this.price = 12;
            this.income = 0;
            this.life = 20;
            this.vector2D = vector2D;
        }
        else if(type == 3) //fortaleza
        {
            this.price = 18;
            this.income = 0;
            this.life = 25;
            this.vector2D = vector2D;
        }

        else //ninguna
        {

        }
    }
}