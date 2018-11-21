
var price = function(){
    this.priceValue = 0;
}


price.prototype.getPrice = function(type){
    if(type == 255) //Peasant
        return 5;
    else 
        return 0;
}

module.exports = price;
