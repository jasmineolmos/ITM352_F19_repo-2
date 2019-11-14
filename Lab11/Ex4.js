attributes  =  "Jasmine;19;19.5;18.5" ;

theSeparator = ';'
parts = attributes.split(theSeparator);

// parts = ["Jasmine";19;19.5;-18.5] ;

for (i=0; i<parts.length; i++) {

parts.forEach(funtion (item, index) 
    console.log( (typeof item == 'string' && item.length > 0)?true:false )


 
}

function printIt(item, index) {
    console.log(`${parts[i]} isNonNegInt ${isNonNegInt(parts[i], true)}`);
}

console.log(parts.join(theSeparator));

//returns a boolean to check if the string value we have is usable
function isNonNegInt(q, returnsErrors = false) { 
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnsErrors ? errors : (errors.length == 0);
}

console.log(isNonNegInt(10));
