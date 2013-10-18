/*
 * Going through http://expressjs.com/guide.html
 **/

// IMPORTS
var express = require('express');
var redis = require('redis');
var db = redis.createClient();
var app = express();


// MIDDLEWARE
// Middleware to track users
app.use(function(req, res, next){
  var ua = req.headers['user-agent'];
  db.zadd('online', Date.now(), ua, next);
})

// Middleware for getting current users
app.use(function(req, res, next){
  var min = 60 * 1000;
  var ago = Date.now() - min;
  db.zrevrangebyscore('online', '+inf', ago, function(err, users){
    if (err) return next(err);
    req.online = users;
    next();
  });
});


// PAGES
// Create low level hello.txt
app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

// Create high level hi.txt
app.get('/hi.txt', function(req, res){
  res.send('Hi World');
});

// Create default page
app.get('/', function(req, res){
  res.send(req.online.length + ' users online');
});


// Start listener
app.listen(9002);
console.log("Listening on 9002");
