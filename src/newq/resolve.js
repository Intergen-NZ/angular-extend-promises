'use strict';

var newq = require('./');
var autoDecorate = require('./autoDecorate');

// depending Angular's version, $q.resolve might not exist
module.exports = autoDecorate('resolve') || function(val) {
  var def = newq.defer();
  def.resolve(val);
  return def.promise;
};
