var fs = require("fs")
var ssl_options = {
  key: fs.readFileSync('privatekey.pem'),
  cert: fs.readFileSync('certificate.pem')
};
     
var port = process.env.PORT || 3000;
var express = require('express');
var ejs = require('ejs');
var passport = require('passport')
  , ForceDotComStrategy = require('./lib/passport-forcedotcom').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;
var restProxy = require('./lib/rest-proxy');

//define passport usage
passport.use(new ForceDotComStrategy({
    clientID: '[FDCID]',
    clientSecret: '[FDCSECRET]',
    callbackURL: 'https://127.0.0.1:'+port+'/token'
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

passport.use(new TwitterStrategy({
  consumerKey: '[TWITTERID]',
  consumerSecret: '[TWITTERSECRET]',
  callbackURL: 'https://127.0.0.1:'+port+'/twitter-token' //this will need to be dealt with
  }, function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }));

passport.use(new FacebookStrategy({
    clientID: '[FBID]',
    clientSecret: '[FBSECRET]',
    callbackURL: 'https://127.0.0.1:'+port+'/facebook-token'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

//define REST proxy options based on logged in user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.redirect('/error')
}

//configure, route and start express
var app = express.createServer(ssl_options);
app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'thissecretrocks' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});


app.get('/', 
  function(req, res) {
    res.send('Hello World.');
  });

app.get('/login', passport.authenticate('forcedotcom'));

app.get('/token', passport.authenticate('forcedotcom', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });

app.get('/twitter-login', passport.authenticate('twitter'));

app.get('/twitter-token', passport.authenticate('twitter', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });

  app.get('/facebook-login', passport.authenticate('facebook'));

app.get('/facebook-token', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In.');
  });


app.get('/error', function(req, res){
  res.send('An error has occured.');
  });

app.all('/:label/:mode/*',
  ensureAuthenticated,
  function(req, res) {
    console.log(req.session);
    if(req.session["passport"]["user"] && req.params.label == "fdc") {
      var restOptions = {
        useHTTPS : true,
        host : req.session["passport"]["user"].instance_url,
        headers: {
            'Authorization': 'OAuth '+req.session["passport"]["user"].access_token,
            'Accept':'application/jsonrequest',
            'Cache-Control':'no-cache,no-store,must-revalidate'
          }
      }

      restProxy.proxy(req,res);
    }
  });

app.get('/*',function(req, res) {
  res.render(req.url.substring(1,req.url.length)); //really?
})

app.listen(port, function() {
  console.log("Listening on " + port);
});

