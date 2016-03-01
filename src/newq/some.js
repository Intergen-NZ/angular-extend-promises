'use strict';

var _ = require('../_');
var newq = require('./');
var AggregateError = require('./errors').AggregateError;

module.exports = function(array, count) {
  if (array.length < count) {
    return newq.reject(new AggregateError(
      'initial array length (' + array.length + ') > count (' + count + ')'
    ));
  }

  var rejectedCount = 0;
  var res = [];
  var def = newq.defer();

  _.each(array, function(elt) {
    newq.when(elt)
      .tap(function(val) {
        if (res === null)
          return;

        res.push(val);

        // resolve when we have enough fulfilled elements
        if (res.length >= count) {
          def.resolve(res);
          res = null;
        }
      })
      .$$catch(function() {
        if (res === null)
          return;

        ++rejectedCount;

        // reject if objective cannot be fulfilled
        if (array.length - rejectedCount < count) {
          def.reject(new AggregateError(
            'Cannot resolve promise: too many rejections (' + rejectedCount + ')'
          ));
          res = null;
        }
      })
    ;
  });

  return def.promise;
};
