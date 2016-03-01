'use strict';

var newQ = require('../newq');

module.exports = function() {
  return this
    .then.apply(this, arguments)
    .$$catch(function(err) {
      setTimeout(function() {
        throw err;
      });
    })
    .$$finally(function() {
      return newQ.reject(new Error('Do not chain anything after calling done()!'));
    })
  ;
};
