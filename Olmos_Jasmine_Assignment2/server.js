//referenced from assignment 1 examples

var fs = require('fs');
var express = require('express'); 
const querystring = require('querystring'); 
const product_list = require('./public/product_list'); 
var app = express(); 
var parser = require('body-parser');

app.use(parser.urlencoded({ extended: true })); 

// server for login, referenced from lab 14

var filename = 'user_data.json'

if (fs.existsSync(filename)) { //check to see if file exists
  stats = fs.statSync(filename);

  console.log(filename + ' has ' + stats.size + ' characters');

  data = fs.readFileSync(filename, 'utf-8')

  users_reg_data = JSON.parse(data);

} else {
  console.log(filename + ' does not exist!');
}
// post the log in request and show the user is logged in 
// referenced from lab 14

app.post("/login.html", function (req, res) {
  
  var LogError = [];
  console.log(req.body);
  // the username is case insensitive 
  the_username = req.body.username.toLowerCase(); 
  //check to see if the username and password exist, referenced from lab 14
  if (typeof users_reg_data[the_username] != 'undefined') { 
    if (users_reg_data[the_username].password == req.body.password) { 
    req.query.username = the_username;
      console.log(users_reg_data[req.query.username].name);
      req.query.name = users_reg_data[req.query.username].name
      res.redirect('/invoice.html?' + querystring.stringify(req.query)); // need to put query back into it
      return;
    } else{
      LogError.push = ('Invalid Password');
      console.log(LogError);
      req.query.username= the_username;
      req.query.password=req.body.password;
      req.query.LogError=LogError.join(';');
    }
  }
  else {
    LogError.push = ('Invalid Username');
    console.log(LogError);
    req.query.username= the_username;
    req.query.password=req.body.password;
    req.query.LogError=LogError.join(';');
  }
  res.redirect('/login.html?' + querystring.stringify(req.query));

}
);
// processing the registration data
app.post("/register.html", function (req, res) {
  qstr = req.body
  console.log(qstr);

  
  var errors = [];

  //name contains only letters 
  if (/^[A-Za-z]+$/.test(req.body.name)) {
  }
  else {
    errors.push('Use Letters Only for Full Name')
  }
  // validating name
  if (req.body.name == "") {
    errors.push('Invalid Full Name');
  }
  // length of full name is less than 30
  if ((req.body.name.length > 30)) {
    errors.push('Full Name Too Long')
  }
  
  
  //checks to see if username already exists

  var reguser = req.body.username.toLowerCase(); 
  if (typeof users_reg_data[reguser] != 'undefined') { 
    errors.push('Username taken')
  }
  //Check letters and numbers only
  
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
  }
  else {
    errors.push('Letters And Numbers Only for Username')
  }

  //password is min 6 characters long 
  if ((req.body.password.length < 6)) {
    errors.push('Password Too Short')
  }
  // check to see if passwords match
  if (req.body.password !== req.body.confirmpsw) { 
    errors.push('Password Not a Match')
  }

  


  // if there are no errors, save the json data and send user to the invoice
  if (errors.length == 0) {
    console.log('none!');
    req.query.username = reguser;
    req.query.name = req.body.name;
    res.redirect('./invoice.html?' + querystring.stringify(req.query))
  }
  if (errors.length > 0) {
    console.log(errors)
    req.query.name = req.body.name;
    req.query.username = req.body.username;
    req.query.password = req.body.password;
    req.query.confirmpsw = req.body.confirmpsw;
    req.query.email = req.body.email;

    req.query.errors = errors.join(';');
    res.redirect('./register.html?' + querystring.stringify(req.query)) //trying to add query from registration page and invoice back to register page on reload
  }

  //add errors to querystring

}
);


app.get('/purchase', function (req, res, next) { //getting the data from the form where action is '/purchase' 
  console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query)); // logging the date, IP address, and query of the purchase (quantities written in textboxes) into console

  // Validating quantity data, go through each and check if good
  // Done with help from Port
  let GET = req.query; // GET is equal to getting the request from the query
  console.log(GET); // putting the query that take from the form into the console
  var hasValidQuantities = true; // empty textbox is assumed true - quantity assumed valid even before entering anything
  var hasPurchases = false; //assume quantity of purchases are false (invalid) from the start
  for (i = 0; i < product_list.length; i++) { // for every product in the array, increasing by 1
    q = GET['quantity_textbox' + i]; // q is equal to the quantity pulled from what is entered into the textbox
    if (isNonNegInt(q) == false) { //if the quantity is not an integer
      hasValidQuantities = false; //hasValidQuantities is false 
    }
    if (q > 0) { // if the quantity entered in textbox is greater than 0
      hasPurchases = true; // hasPurchases is true - because there is a quantity greater than 0 entered in the textbox
    }
    console.log(hasValidQuantities, hasPurchases); // logging hasValidQuantities and hasPurchases into console to check validity (true or false)
  }

  // If it ok, send to invoice. if not, send back to the order form
  qString = querystring.stringify(GET); //stringing the query together
  if (hasValidQuantities == true && hasPurchases == true) { // if both hasValidQuantities and hasPurchases are true
    res.redirect('./login.html?' + querystring.stringify(req.query)); // redirect to the invoice page with the query entered in the form
  } else {    // if either hasValidQuantities or hasPurchases is false
    req.query["hasValidQuantities"] = hasValidQuantities; // request the query for hasValidQuantities
    req.query["hasPurchases"] = hasPurchases; // request the query for hasPurchases
    console.log(req.query); // log the query into the console
    res.redirect('./form.html?' + querystring.stringify(req.query)); // redirect to the form again, keeping the query that they wrote
  }


});

app.use(express.static('./public')); // create a static server using express from the public folder


var listener = app.listen(8080, () => { console.log('listening on port  ' + listener.address().port) });

//check to see if there are errors and list them out if there are 
function checkQuantityTextbox() { 
  errs_array = isNonNegInt(quantity_textbox.value, true); 
    qty_textbox_message.innerHTML = errs_array.join(','); 
}

// ensures the quantity entered is positive and an integer 
function isNonNegInt(q, returnErrors = false) { 
  errors = [];
  if (q == '') q = 0; 
  if (Number(q) != q) errors.push('Not a number!'); 
  if (q < 0) errors.push('Negative value!'); 
  if (parseInt(q) != q) errors.push('Not an integer!'); 
  return returnErrors ? errors : (errors.length == 0); 
}

//processing the form and making sure quantities entered in the textbox are valid
function process_form(GET, response) { 
  if (typeof GET['purchase'] != 'undefined') { 
    for (i in products) { 
      let q = GET[`quantity_textbox${i}`]; 
      if (isNonNegInt(q)) { 
        receipt += eval('`' + contents + '`'); 
      } else { 
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`; //tell the user it is not a valid quantity
      }
    }
    response.send(receipt); 
    response.end(); 
  }
}

