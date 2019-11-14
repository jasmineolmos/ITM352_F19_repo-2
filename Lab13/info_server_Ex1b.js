var express = require('express');
var app = express();
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});
app.use(express.static('./public')); // creates a middleware that will do the method called static that is in express, when you give it a directory it will set up a respond to get request
app.listen(8080, () => console.log(`listening on port 8080`));