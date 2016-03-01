'use strict';

var decorate = require('../promise/decorate');
var globals = require('../globals');

module.exports = function autoDecorate(name) {
  return !(name in globals.$delegate) ? null : function() {
    return decorate(globals.$delegate[name].apply(globals.$delegate, arguments));
  };
};
