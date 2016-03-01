'use strict';

var _ = require('../_');
var globals = require('../globals');
var callNewQ = require('./callNewQ');
var defineProperty = require('../defineProperty');

var aliases = {
  'catch': 'caught',
  'finally': 'lastly',
  'return': ['thenReturn', 'returns'],
  'throw': ['thenThrow']
};

function Promise($qPromise, parent) {
  defineProperty(this, '$$state', $qPromise.$$state);

  _.each(_.methods($qPromise), function(name) {
    defineProperty(this, '$$' + name, $qPromise[name]);
  }, this);

  if (parent && parent.$$boundTo)
    defineProperty(this, '$$boundTo', parent.$$boundTo);

  defineProperty(this, '$$arrayListeners', []);

  this.then = $qPromise.then = this.then.bind(this);
}

module.exports = function decorate($qPromise, parent) {
  return new Promise($qPromise, parent);
};

Promise.prototype = {
  // call newQ.all if unsynced, does nothing otherwise
  all: callNewQ('all'),
  any: callNewQ('any'),
  bind: require('./bind'),
  call: require('./call'),
  'catch': require('./catch'),
  delay: require('./delay'),
  done: require('./done'),
  each: callNewQ('each'),
  filter: callNewQ('filter'),
  'finally': function() {
    return this.$$finally.apply(this, arguments);
  },
  get: require('./get'),
  map: callNewQ('map'),
  nodeify: require('./nodeify'),
  props: callNewQ('props'),
  reduce: callNewQ('reduce'),
  'return': require('./return'),
  some: callNewQ('some'),
  spread: require('./spread'),
  tap: require('./tap'),
  then: require('./then'),
  'throw': require('./throw'),
  timeout: require('./timeout'),

  constructor: Promise
};

defineProperty(Promise.prototype, '$$callArrayListeners', function(array) {
  _.each(this.$$arrayListeners, function(listener) {
    listener(array);
  });
});

_.each(aliases, function(targets, method) {
  if (!_.isArray(targets))
    targets = [targets];

  if (globals.$options.compatibilityAliases) {
    _.each(targets, function(target) {
      Promise.prototype[target] = Promise.prototype[method];
    });
  }

  if (globals.$options.disableES5Methods)
    delete Promise.prototype[method];
});
