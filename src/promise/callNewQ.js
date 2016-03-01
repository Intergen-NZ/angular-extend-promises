'use strict';

var bindMethods = require('./bindMethods');
var newQ = require('../newq');
var defineProperty = require('../defineProperty');

module.exports = function callNewQ(method) {
  /* jshint -W040 */
  function execute(args, arr) {
    var res = newQ[method].apply(null, [arr].concat(args));
    defineProperty(res, '$$boundTo', this.$$boundTo);
    return res;
  }
  /* jshint +W040 */

  return function() {
    var args = bindMethods.call(this, arguments);

    // chain if not synced
    if (this.$$unsynced) {
      // create new promise with next($$unsynced, args…)
      return execute.call(this, args, this.$$unsynced);
    }

    var then = this.then(function(val) {
      if (then.$$promiseResult)
        return then.$$promiseResult;

      var res = execute.call(this, args, val);

      if (then.$$arrayListeners.length && res.$$unsynced)
        then.$$callArrayListeners(res.$$unsynced);

      return res;
    }.bind(this));

    this.$$arrayListeners.push(function(array) {
      defineProperty(this, '$$promiseResult', execute.call(this, args, array));

      if (then.$$arrayListeners.length && this.$$promiseResult.$$unsynced)
        then.$$callArrayListeners(this.$$promiseResult.$$unsynced);
    }.bind(this));

    return then;
  };
};
