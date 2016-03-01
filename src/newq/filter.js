'use strict';

var _ = require('../_');
var newq = require('./');

module.exports = function(array, cb, options) {
  return newq.map(array, function(val) {
    return newq.props({
      val: val,
      toFilter: cb.apply(null, arguments)
    });
  }, options)
    .then(function(array) {
      return _.map(_.filter(array, 'toFilter'), 'val');
    })
  ;
};
