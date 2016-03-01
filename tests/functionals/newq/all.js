describe('newq.all', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should synchronize an array of values or promises of values', function(done) {
    var chain = createPromiseChain(newq);

    expect(newq.all([2].concat(chain.resolveNext(42, 10).reverse())))
      .to.eventually.be.deep.equal([2, 10, 42])
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should return a decorated promise', function() {
    expect(newq.all([2], function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });

  it('should accept an object and act like props', function() {
    expect(newq.all({
      prop: newq.resolve(42)
    }))
      .to.eventually.be.fulfilled
      .and.to.have.property('prop', 42)
    ;
  });
});
