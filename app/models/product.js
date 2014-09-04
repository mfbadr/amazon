'use strict';

//var   Mongo  = require('mongodb');

function Product(){
}

Object.defineProperty(Product, 'collection', {
  get: function(){return global.mongodb.collection('products');}
});

module.exports = Product;

