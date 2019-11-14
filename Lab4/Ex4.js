var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    console.log(req.headers); //output the request headers to the console
    res.writeHead(200, { 'Content-Type': 'text/html' }); // set MIME type to HTML 
  //res.writeHead(301, { "Location": "http://amazon.com"}); 
   res.write('<script>window.location = "http://www.apple.com";</script>');
   res.end(); //end the response
  

  //res.write('<script>window.location = "http://www.apple.com";</script>');
}).listen(8080); //the server object listens on port 8080

console.log('Hello world HTTP server listening on localhost port 8080');