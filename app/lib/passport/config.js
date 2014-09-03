'use strict';

var local       = require('./local'),
    serialize   = require('./serialize'),
    twitter     = require('./twitter'),
    google      = require('./google'),
    github      = require('./github'),
    deserialize = require('./deserialize');

module.exports = function(passport, app){
  passport.use(local);
  passport.use(twitter);
  passport.use(github);
  passport.use(google);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);

  app.use(passport.initialize());
  app.use(passport.session());
};
