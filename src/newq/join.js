'use strict';

var _ = require('../_');
var newq = require('./');

module.exports = function join() {
  var args = _.toArray(arguments);
  var cb = args.pop();
  return newq.all(args).spread(cb);
};
