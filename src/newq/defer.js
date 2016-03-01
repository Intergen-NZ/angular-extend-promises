'use strict';

var decorate = require('../promise/decorate');
var globals = require('../globals');

globals.$defer = function $defer(parent) {
  var deferred = globals.$delegate.defer();
  deferred.promise = decorate(deferred.promise, parent);
  return deferred;
};

module.exports = function defer() {
  return globals.$defer();
};
