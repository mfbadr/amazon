'use strict';

var User = require('../models/user');

exports.update = function(req, res){
  req.user.update(req.body, function(err){
    if(err){
      req.flash('error', err);
      res.redirect('/profile/edit');
      return;
    }
    //catch err if duplicate email, falsh and redirect
    req.flash('notice', 'You have updated the user.');
    res.redirect('/profile');
  });
};

exports.edit = function(req, res){
  res.render('users/edit');
};
exports.profile = function(req, res){
  res.render('users/profile');
};

exports.new = function(req, res){
  res.render('users/new');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.logout();
  //req.flash('notice', 'Thanks for visiting');
  res.redirect('/');
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

