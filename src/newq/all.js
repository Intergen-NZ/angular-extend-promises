'use strict';

var _ = require('../_');
var decorate = require('../promise/decorate');
var globals = require('../globals');
var newq = require('./');

module.exports = function(promises) {
  if (!_.isArray(promises))
    return newq.props(promises);

  promises = _.map(promises, function(promise) {
    return newq.when(promise);
  });

  return decorate(globals.$delegate.all(promises));
};
