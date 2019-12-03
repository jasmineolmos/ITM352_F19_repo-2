var products = [
{  
    "product":"Lipstick",  
    "price": 10.00,  
    "image": "./lipstick.jpg", 
    "description": "A bright red lipstick made to turn heads."
},
{
    "product":"Eyeshadow",  
    "price": 20.00,  
    "image": "./eyeshadow.jpg",
    "description": "A light pink eyeshadow to wear in the day, can also be used as blush." 
},
{
    "product":"Foundation",  
    "price": 15.00,  
    "image": "./foundation.jpg",
    "description": "Foundation with SPF to protect you from the sun when you're out and about."
}

];
// referenced from lab 13, exports the product data so we can get it in the product_display
if(typeof module != 'undefined') {
    module.exports.products = products;
  }