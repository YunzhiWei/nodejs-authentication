var express       = require('express');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser('12345-67890-09876-54321')); // secret key

// Basic Authentication
function authCheck (req, res, next) {
  console.log("req.headers: ", req.headers);
  console.log("req.signedCookies: ", req.signedCookies);

  if(!req.signedCookies.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
      return;
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      res.cookie('user','admin',{signed: true});
      next(); // authorized
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      next(); // authorized
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
}
app.use(authCheck);    // authentication check: any routers before authentication check, do not need user name and password

// routers

// declare all routers together
// var routes = require('routes');
// routes(app);

// declare each router one by one
app.use('/dishes', require('./routes/dishes'));
app.use('/promotions', require('./routes/promotions'));
app.use('/leaders', require('./routes/leaders'));

app.use(express.static(__dirname + '/public'));

function errorHandler(err,req,res,next) {
  console.log("Error message: ", err);
  res.writeHead(
    err.status || 500,
    {
      'WWW-Authenticate': 'Basic',
      'Content-Type': 'text/plain'
    }
  );
  res.end(err.message);
}
app.use(errorHandler);

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
