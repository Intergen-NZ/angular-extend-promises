'use strict';

var newq = require('../newq');
var _ = require('../_');

function checkErrorsAndPredicates(errorsAndPredicates, err) {
  var any = !errorsAndPredicates.length;
  _.each(errorsAndPredicates, function(test) {
    if (!_.isFunction(test))
      throw new Error('Invalid argument.');

    if (test instanceof Error || test.prototype instanceof Error) {
      any = any || err instanceof test;

      return !any;
    }

    any = any || test(err);
    return !any;
  });
  return any;
}

module.exports = function() {
  var errorsAndPredicates = _.toArray(arguments);
  var callback = errorsAndPredicates.pop();

  return this.$$catch(function(err) {
    if (!_.isFunction(callback) || !checkErrorsAndPredicates(errorsAndPredicates, err))
      return newq.reject(err);

    return callback.call(this, err);
  });
};
