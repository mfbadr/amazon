'use strict';

var config = {};

config.twitter = {
  apiKey      : 'LNfG2qlieNXHUEPrXx8bcEeiq',
  apiSec      : process.env.TWITTER_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/twitter/callback'
};

config.github = {
  clientId    : '4a48fab8eac0fa8b4ac2',
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/github/callback'
};

config.google = {
  clientId    : '75269371673-d5pes8pmg7t39s5q4v88rjaulne52ltg.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/google/callback'
};

module.exports = config;
