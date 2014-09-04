'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    security       = require('../lib/security'),
    crypto         = require('crypto'),
    passport       = require('passport'),
    flash          = require('connect-flash'),
    passportConfig = require('../lib/passport/config'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home'),
    products       = require('../controllers/products'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));
  app.use(flash());
  passportConfig(passport, app);

  app.use(security.locals);
  app.use(debug.info);

  app.get('/', home.index);
  app.get('/register', users.new);
  app.post('/register', users.create);
  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged in!', failureFlash:'Incorrect email/password'}));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Twitter!', failureFlash:'Failed to login through Twitter'}));

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Github!', failureFlash:'Failed to login through Github'}));

  app.get('/auth/google', passport.authenticate('google',  {scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
  app.get('/auth/google/callback', passport.authenticate('google', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Google!', failureFlash:'Failed to login through Google'}));

  app.get('/auth/reddit', function(req, res, next){
    req.session.state = crypto.randomBytes(32).toString('hex');
    passport.authenticate('reddit', {
      state: req.session.state
    })(req, res, next);
  });
  app.get('/auth/reddit/callback', passport.authenticate('reddit', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Reddit!', failureFlash:'Failed to login through Reddit'}));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/login', successFlash:'You are logged with Facebook!', failureFlash:'Failed to login through Facebook'}));

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  app.get('/profile', users.profile);
  app.get('/profile/edit', users.edit);
  app.post('/profile', users.update);

  app.get('/products', products.index);
  console.log('Express: Routes Loaded');
};

