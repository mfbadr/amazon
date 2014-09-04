'use strict';

var Product = require('../models/product'),
    _       = require('underscore');

exports.add = function(req, res){
  Product.findById(req.body.productId, function(err, product){
    req.session.cart = req.session.cart || [];
    req.session.cart.push(product);
    req.session.save(function(){
      res.redirect('/cart');
    });
  });
};

exports.index = function(req, res){
  res.render('cart/index', {cart:req.session.cart || [], _:_});
};
