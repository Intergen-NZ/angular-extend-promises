'use strict';

var _ = require('../_');

module.exports = function(val) {
  return this.then(_.constant(val));
};
