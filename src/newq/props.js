'use strict';

var _ = require('../_');
var newq = require('./');

module.exports = function(obj) {
  return newq.all(_.values(obj)).then(function(vals) {
    return _.object(_.keys(obj), vals);
  });
};
