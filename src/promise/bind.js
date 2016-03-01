'use strict';

var defineProperty = require('../defineProperty');

module.exports = function(bound) {
  defineProperty(this, '$$boundTo', bound);
  return this;
};
