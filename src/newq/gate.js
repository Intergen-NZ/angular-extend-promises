'use strict';

var _ = require('../_');
var globals = require('../globals');

var Gate = module.exports = function Gate(options) {
  this.$options = _.defaults(options, {
    concurrency: 1,
    maxQueue: 0
  });
  this.$fns = [];
};

Gate.prototype.add = function(fn) {
  // if (this.$options.maxQueue > 0 && this.$fns.length - this.$options.concurrency >= this.$options.maxQueue)
  //     return def.reject(new Error('Max queue size reached'));

  var def = globals.$defer();

  var $fn = function() {
    fn()
      ['finally'](function() {
        this.$fns.splice(this.$fns.indexOf($fn), 1);

        if (this.$fns.length >= this.$options.concurrency)
          this.$fns[this.$options.concurrency - 1]();
      }.bind(this))

      .then(function(val) {
        def.resolve(val);
      }, function(err) {
        def.reject(err);
      })
    ;
  }.bind(this);

  if (this.$fns.push($fn) <= this.$options.concurrency)
    $fn();

  return def.promise;
};
