var bcrypt = require('bcryptjs');
var utils = require('./utils');
var RememberMeStrategy = require('passport-remember-me').Strategy;
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var Client = require('node-rest-client').Client;
var http_client = new Client();
var Constants = require("./Constants");
var redis_client = require("node-redis").createClient(Constants.redis_port,Constants.redis_host);

function Security() {}

Security.prototype.initApp = function (app) {
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(passport.authenticate('remember-me'));
}

Security.prototype.initSecurity = function () {
	passport.use(new LocalStrategy(
		  function(username, password, done) {
			//var salt = bcrypt.genSaltSync(10);
			// var hash = bcrypt.hashSync("B4c0/\/", salt);
		    var req = http_client.post("http://" + Constants.password_auth_host + "/users/" + username + 
		    		"/authorize?password=" + password 
		    		, function(data, response){
				  if (data == true) { return done(null,username);}
				  else done(null,false,{message: "Invalid user or password"});
			  	}); 
		    req.on('error', function (err) {
		    	console.log('request error', err);
		    	done(err);
		    });
		  })
		);

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});


	//Remember Me cookie strategy
	//This strategy consumes a remember me token, supplying the user the
	//token was originally issued to.  The token is single-use, so a new
	//token is then issued to replace it.
	passport.use(new RememberMeStrategy({key: Constants.remember_me_cookie_name},
			obtainUserForToken, issueToken));
}

// Consumes remember me token. Calls done with the user that was mapped to the token
function obtainUserForToken(token,done){
	redis_client.get(token, function(err, uid) {
		if (err) { return done(err); }
		if (!uid) { return done(null, false); }
		redis_client.del(token);
		return done(null,uid.toString('utf-8'));
	});
}

// Issues a new token with a random string.
function issueToken(user, done) {
	var token = utils.randomString(64);
	
	redis_client.set(token, user, function(err) {
		if (err) { console.log("Error in setting remember me token " + err);return done(err); }
		});	
	redis_client.expire(token,Constants.remember_me_time_in_seconds); 
	return done(null, token);	
}

Security.prototype.registerSecurityUrls = function (app) {
	app.post('/ret-authentication',
			passport.authenticate('local'), 
			rememberMe, redirectToTarget
	);
	app.all('/logout',
	  function (req,res) {
		  res.clearCookie(Constants.remember_me_cookie_name);
		  req.logout();
		  res.redirect('/');
		  return;
	  }
	);
}

function rememberMe(req, res, next) {
    // Issue a remember me cookie if the option was checked
	if (!req.body.remember_me) { return next(); }
    
    issueToken(req.user, function(err, token) {
      if (err) {  return next(err); }
      res.cookie(Constants.remember_me_cookie_name, 
    		  token, { path: '/', httpOnly: true, 
    	  			   maxAge: Constants.remember_me_time_in_seconds*1000 }); // Needs to be in milliseconds here
      return next();
    });
 }

function redirectToTarget(req, res) {
	var returnTo = req.session.returnTo;
	req.session.returnTo = null;
	delete req.session.returnTo;
	res.redirect(returnTo || '/');
	return;
}

// Implement security check for protected resources
Security.prototype.checkAndRedirect = function(http_request,http_response,next){
	if(!http_request.isAuthenticated()){
		  http_request.session.returnTo = http_request.path;
		  http_response.redirect("/login");
		  return;
	}
	return next();
}

module.exports = Security;