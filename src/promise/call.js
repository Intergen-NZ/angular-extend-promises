'use strict';

var _ = require('../_');

module.exports = function() {
  var args = _.toArray(arguments);
  var method = args.shift();

  return this.then(function(val) {
    return val[method].apply(val, args);
  });
};
