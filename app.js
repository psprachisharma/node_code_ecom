var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Constants = require("./Constants");
var bodyParser = require('body-parser');
var session = require('express-session');
var Security = require('./Security');
var RedisStore = require('connect-redis')(session);
var redis_client = require("node-redis").createClient(Constants.redis_port,Constants.redis_host);
var View = require("./View");
var routes = require('./routes/index');


var app = express();

app.set('views', path.join(__dirname, 'views'));

//app.set("views","http://localhost:8080/views");
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
		  secret: 'bestkeptsecretinnode.js',
		  store: new RedisStore({ host: Constants.redis_host, port: Constants.redis_port, client: redis_client }),
		  resave: true,
		  saveUninitialized: false,
		  cookie: { httpOnly: true}, // 
		  key: Constants.session_cookie_name, // name of the session cookie
		  rolling: true // the session would be renewed with every request.
	}));

var security = new Security();
security.initApp(app);
security.initSecurity();
security.registerSecurityUrls(app);


app.use('/', routes);
routes.security = security;

app.get('/error', function(req, res){
	  res.send('An error has occured.');
	  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
