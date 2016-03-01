'use strict';

var newQ = require('../newq');

module.exports = function(fn) {
  return this.then(function(value) {
    // returns only when fn(value) promise chain is fully resolved
    return newQ.when(fn.call(this, value)).returns(value);
  });
};
