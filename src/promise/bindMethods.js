'use strict';

var _ = require('../_');

module.exports = function bindMethods(array) {
  return _.map(array, function(arg) {
    if (!_.isFunction(arg))
      return arg;
    return arg.bind(this.$$boundTo || this);
  }, this);
};
