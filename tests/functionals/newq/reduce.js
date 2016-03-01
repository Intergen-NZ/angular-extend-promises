'use strict';

describe('newq.reduce', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should reduce the array with the given promise', function(done) {
    var chain = createPromiseChain(newq);

    var values = chain.resolveNext(1, 39);
    values.splice(1, 0, 2);

    // values is [Promise(1), 2, Promise(39)]
    expect(newq.reduce(values, function(acc, val) {
      return acc ? newq.resolve(acc + val) : acc + val;
    }, 0))
      .to.eventually.equal(42)
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should return the initial value if the array is empty', function(done) {
    expect(newq.reduce([], function() {}, 42))
      .to.eventually.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.reduce([], function() {}, 0))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
