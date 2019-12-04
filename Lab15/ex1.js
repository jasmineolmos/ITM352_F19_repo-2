var express = require('express');
var app = express();
var myParser = require("body-parser"); // to respond to the post method 
var fs = require('fs');
var filename = 'user_data.json';
app.use(myParser.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');

app.use(session({secret: "ITM352 rocks!"}));


if (fs.existsSync(filename)) // see if the file exists first, then load it 
{
    stats = fs.statSync(filename);

    console.log(filename + ' has ' +stats.size + ' characters! ')
    data = fs.readFileSync(filename, 'utf-8')

    users_reg_data = JSON.parse(data);
/*
    username = 'newuser';
    users_reg_data[username] = {};
    users_reg_data[username].name = "newuser"
    users_reg_data[username].password = 'newpass';
    users_reg_data[username].email = 'newuser@user.com';

    fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //converts this object into json data 
*/

    console.log(users_reg_data);
} else {
        console.log(filename + ' does not exists!');
}
app.use(cookieParser());
app.get ('/use_session', function(request, response) {
    response.send(`welcome, ur session if is ${request.session.id}`);
});

app.get("/set_cookie", function(request, response){
    response.cookie('myname', 'Jasmine Olmos',{maxAge: 5*1000}).send('cookie set');

});

app.get("/use_cookie", function(request, response){
    output = "no \cookie with myname";
    if (typeof request.cookies.myname != 'undefined') {

    output = `welcome to the use cookie page ${request.cookies.myname}`;
    
    }
    response.send(output);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form
    // validate the data entered
    // all good, save the new user 
    username = request.body.username;
    users_reg_data[username] = {};
   // users_reg_data[username].name = request.body.name; for assignment 2 use this
    users_reg_data[username].password = request.body.password;
    users_reg_data[username].email = request.body.email;
   
    fs.writeFileSync(filename, JSON.stringify(users_reg_data)); //converts this object into json data

    response.send(`${username}registered!`);
 });
// send them to the inv
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) { 
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    the_username = request.body.username;
    if(typeof users_reg_data[the_username] != 'undefined') { // if the username is not undefined (it exists)
        if (users_reg_data[the_username].password == request.body.password){ //check to see if the password matches what is stored
            response.send (the_username + ' logged in');
        } else {
            response.redirect('/login');
            
        }

       }
});

app.listen(8080, () => console.log(`listening on port 8080`));