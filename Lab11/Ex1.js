
attributes  =  "Jasmine;19;19.5;18.5" ;

theSeparator = ';'
parts = attributes.split(theSeparator);

// parts = ["Jasmine;19;19.5;18.5"] ;

for (i=0; i<parts.length; i++) {


console.log(typeof parts [i]);

}

console.log(parts.join(theSeparator));

