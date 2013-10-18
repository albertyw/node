/*
 * Going through http://expressjs.com/guide.html
 **/

// Import and instantiate express
var express = require('express');
var server = express();

// Create low level hello.txt
server.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

// Create high level hi.txt
server.get('/hi.txt', function(req, res){
  res.send('Hi World');
});

// Start listener
server.listen(9002);
console.log("Listening on 9002");
