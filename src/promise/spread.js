'use strict';

var _ = require('../_');

module.exports = function(fn) {
  return this.then(function(value) {
    // given value might not be an array
    if (!_.isArray(value))
      value = [value];

    return fn.apply(this, value);
  });
};
