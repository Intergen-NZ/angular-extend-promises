'use strict';

var globals = require('../globals');
var newq = require('../newq');

module.exports = function(ms, msg) {
  var def = globals.$defer(this);
  var to = setTimeout(function() {
    def.reject(new newq.TimeoutError(msg || 'Timed out after ' + ms + ' ms'));
  }, ms);

  this
    .then(function(val) {
      def.resolve(val);
    }, function(err) {
      def.reject(err);
    })
    ['finally'](clearTimeout.bind(null, to))
  ;

  return def.promise;
};
