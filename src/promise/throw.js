'use strict';

var newq = require('../newq');

module.exports = function(err) {
  return this.then(function() {
    return newq.reject(err);
  });
};
