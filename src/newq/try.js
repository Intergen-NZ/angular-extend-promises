'use strict';

var _ = require('../_');
var newq = require('./');

module.exports = function(fn, args, oThis) {
  try {
    if (!_.isEmpty(args) && !(_.isArray(args) || _.isArguments(args)))
      args = [args];

    return newq.when(fn.apply(oThis || this, args));
  }
  catch (err) {
    return newq.reject(err);
  }
};
