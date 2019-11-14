var products = [
{  
    "product":"Lipstick",  
    "price": 10.00,  
    "image": "./lipstick.jpg" 
},
{
    "product":"Eyeshadow",  
    "price": 20.00,  
    "image": "./eyeshadow.jpg" 
},
{
    "product":"Foundation",  
    "price": 15.00,  
    "image": "./foundation.jpg" 
}

];
// referenced from lab 13
if(typeof module != 'undefined') {
    module.exports.products = products;
  }