'use strict';

module.exports = function(prop) {
  return this.then(function(val) {
    return val[prop];
  });
};
