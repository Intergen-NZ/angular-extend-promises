'use strict';

var globals = require('../globals');

module.exports = function(ms) {
  return this.then(function(val) {
    var def = globals.$defer(this);
    setTimeout(def.resolve, ms, val);
    return def.promise;
  }.bind(this));
};
