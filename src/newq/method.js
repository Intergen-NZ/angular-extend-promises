'use strict';

var attempt = require('./try');

module.exports = function(fn) {
  return function() {
    return attempt(fn, arguments, this);
  };
};
