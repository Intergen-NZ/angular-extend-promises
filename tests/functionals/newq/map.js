describe('newq.map', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should construct a new array with mapped values', function(done) {
    var chain = createPromiseChain(newq);

    expect(newq.map([1].concat(chain.resolveNext(21)), function(val) {
      return chain.resolveNext(val * 2)[0];
    }))
      .to.eventually.deep.equal([2, 42])
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should call the callback with index & array length', function() {
    var spy = sinon.spy();

    newq.map([21, 42], spy);

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledTwice
      .and.to.have.been.calledWithExactly(21, 0, 2)
      .and.to.have.been.calledWithExactly(42, 1, 2)
    ;
  });

  it('should return a decorated promise', function() {
    expect(newq.map([2], function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
