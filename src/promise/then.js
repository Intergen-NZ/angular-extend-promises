'use strict';

var bindMethods = require('./bindMethods');
var decorate = require('./decorate');

// Then is special because it needs the previous then to work
module.exports = function() {
  // convert the promise to newQ
  return decorate(this.$$then.apply(this, bindMethods.call(this, arguments)), this);
};
