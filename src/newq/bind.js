'use strict';

var newq = require('./');

module.exports = function(oThis) {
  return newq.resolve().bind(oThis);
};
