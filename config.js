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

config.reddit = {
  clientId    : 'XXjLnsezuBGJzg',
  clientSecret: process.env.REDDIT_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/reddit/callback'
};

config.facebook = {
  clientId    : '344026865773316',
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/facebook/callback'
};
config.stripe = {
  publicKey   : 'pk_test_J7xcyOMFFJnk4YcLI4vM42jV',
  secretKey   : process.env.STRIPE_SECRET,
  callbackURL : 'http://mikey-vm.com:3333/auth/facebook/callback'
};
module.exports = config;
