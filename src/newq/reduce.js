'use strict';

var _ = require('../_');
var newq = require('./');

module.exports = function(array, cb, initialValue) {
  return _.reduce(array, function(acc, val, i) {
    return newq.join(acc, val, function(acc, val) {
      return cb(acc, val, i, array.length);
    });
  }, newq.resolve(initialValue));
};
