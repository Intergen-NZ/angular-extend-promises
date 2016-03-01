'use strict';

var _ = require('../_');
var newq = require('./');
var Gate = require('./gate');
var defineProperty = require('../defineProperty');

module.exports = function walkCollection(promiseFn) {
  return function(array, cb, options) {
    options = _.pick(options, 'concurrency');

    var gate = options.concurrency ? new Gate(options) : {
      add: function(fn) {
        return fn();
      }
    };

    // create an array with each promises affected by the operation
    var $$unsynced = _.map(array, function(val, i) {
      // return a new promise for each item
      return newq.when(val)[promiseFn](function(val) {
        return gate.add(function() {
          // call user callback
          return newq.when(cb.call(null, val, i, array.length));
        });
      });
    });

    // create a promise synchronizing everything
    var res = newq.all($$unsynced);

    // save the unsynced array of promises in the result
    defineProperty(res, '$$unsynced', $$unsynced);

    // return the promise
    return res;
  };
};
