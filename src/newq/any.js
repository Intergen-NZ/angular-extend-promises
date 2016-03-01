'use strict';

var newq = require('./');

module.exports = function(array) {
  return newq.some(array, 1).get(0);
};
