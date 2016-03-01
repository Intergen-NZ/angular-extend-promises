'use strict';

var _ = require('../_');
var globals = require('../globals');
var errors = require('./errors');

var newq = module.exports = function(resolver) {
  if (!_.isFunction(resolver))
    throw new Error('resolver should be a function');

  var deferred = newq.defer();
  try {
    resolver(deferred.resolve, deferred.reject);
  }
  catch (e) {
    deferred.reject(e);
  }
  return deferred.promise;
};

_.extend(newq, {
  // Methods & aliases
  all: require('./all'),
  any: require('./any'),
  bind: require('./bind'),
  defer: require('./defer'),
  each: require('./each'),
  filter: require('./filter'),
  map: require('./map'),
  join: require('./join'),
  method: require('./method'),
  props: require('./props'),
  reduce: require('./reduce'),
  reject: require('./reject'),
  resolve: require('./resolve'),
  some: require('./some'),
  when: require('./when'),

  // Errors
  AggregateError: errors.AggregateError,
  TimeoutError: errors.TimeoutError
});

if (globals.$options.compatibilityAliases) {
  _.extend(newq, {
    attempt: require('./try')
  });
}

if (!globals.$options.disableES5Methods) {
  _.extend(newq, {
    'try': require('./try')
  });
}
