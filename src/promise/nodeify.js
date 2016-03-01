'use strict';

var _ = require('../_');
var newq = require('../newq');

module.exports = function(cb, options) {
  cb = cb || _.noop;
  options = options || {};

  return this.then(
    function(args) {
      var a = args;

      if (!options.spread || !_.isArray(a))
        a = [null, a];
      else
        a = [null].concat(a);

      cb.apply(this, a);

      return args;
    },

    function(err) {
      cb.call(this, err);
      return newq.reject(err);
    }
  );
};
