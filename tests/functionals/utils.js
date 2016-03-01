(function() {
  'use strict';

  window.createPromiseChain = function createPromiseChain(newq) {
    var promise = newq.resolve();

    function next(method) {
      return function() {
        var promises = [];
        for (var i = 0; i < arguments.length; ++i) {
          var tmp = newq.defer();
          promise.tap(tmp[method].bind(null, arguments[i]));
          promise = tmp.promise;
          promises.push(tmp.promise);
        }
        return promises;
      };
    }

    return {
      resolveNext: next('resolve'),
      rejectNext: next('reject'),

      play: function($rootScope) {
        var cont = true;
        promise.tap(function() {
          cont = false;
        });

        while (cont) {
          $rootScope.$digest();
        }
      }
    };
  };
})();
