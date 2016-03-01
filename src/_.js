'use strict';

/* global _ */

try {
  module.exports = require('../tmp/lodash');
}
catch (e) {
  module.exports = _;
}
