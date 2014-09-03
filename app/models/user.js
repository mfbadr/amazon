'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore'),
    Mongo  = require('mongodb');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.prototype.update = function(o, cb){
  var user = this;
  User.collection.findOne({email:o.email}, function(err, obj){
    if(obj){return cb('There is already a user with that email');
    }

    user.email = o.email;
    user.age   = o.age * 1;
    user.photo = o.photo;

    User.collection.save(user, cb);
  });
};

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  User.collection.findOne({_id:_id}, function(err, obj){
    var user = Object.create(User.prototype);
    user = _.extend(user, obj);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user){return cb();}
    o.type = 'local';
    o.password = bcrypt.hashSync(o.password, 10);
    User.collection.save(o, cb);
  });
};

User.localAuthenticate = function(email, password, cb){
  User.collection.findOne({email:email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.twitterAuthenticate = function(token, secret, twitter, cb){
  User.collection.findOne({twitterId:twitter.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {twitterId:twitter.id, username:twitter.username, displayName:twitter.displayName, type:'twitter'};
    User.collection.save(user, cb);
  });
};

User.githubAuthenticate = function(token, secret, github, cb){
  console.log(github);
  User.collection.findOne({githubId:github.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {githubId:github.id, username:github.username, displayName:github.displayName, type:'github'};
    User.collection.save(user, cb);
  });
};


User.googleAuthenticate = function(token, secret, google, cb){
  console.log(google);
  User.collection.findOne({googleId:google.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {googleId:google.id, username:google.displayName, displayName:google.displayName, type:'google'};
    User.collection.save(user, cb);
  });
};


User.redditAuthenticate = function(token, secret, reddit, cb){
  User.collection.findOne({redditeId:reddit.id}, function(err, user){
    if(user){return cb(null, user);}
    user = {redditId:reddit.id, username:reddit.name, displayName:reddit.name, type:'reddit'};
    User.collection.save(user, cb);
  });
};

module.exports = User;

