'use strict';

angular.module('angular-extend-promises', [])

  .provider('angularExtendPromises', function() {
    this.options = {
      compatibilityAliases: true,
      disableES5Methods: false
    };

    this.$get = function() {
      return this.options;
    };
  })

  .config(['$provide', function($provide) {
    // In test mode, empty the cache before doing anything else
    if (angular.mock) {
      for (var key in require.cache) {
        delete require.cache[key];
      }
    }

    $provide.decorator('$q', ['$delegate', 'angularExtendPromises', function($delegate, angularExtendPromises) {
      var globals = require('./globals');

      globals.$delegate = $delegate;
      globals.$options = angularExtendPromises;

      return require('./newq');
    }]);
  }])

;
