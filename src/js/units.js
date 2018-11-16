'use strict';

var units = function (type, x, y){

        if (type == "peasant") //campesino
        {
            this.life = 10;
            this.strenght = 5;
            this.price = 10;
            this.maintenance = 8;
            this.vector2D = new vector2D(x,y);
        }
        else if (type == "lancer") //lancero
        {
            this.life = 15;
            this.strenght = 10;
            this.price = 15;
            this.maintenance = 12;
            this.vector2D = new vector2D(x,y);
        }
        else if (type == "knight") //caballero
        {
            this.life = 20;
            this.strenght = 15;
            this.price = 20;
            this.maintenance = 15;
            this.vector2D = new vector2D(x,y);
        }
        else if (type == "king") //rey
        {
            this.life = 25;
            this.strenght = 20;
            this.price = 25;
            this.maintenance = 18;
            this.vector2D = new vector2D(x,y);
        }
        else //ninguna
        {
            
        }
}