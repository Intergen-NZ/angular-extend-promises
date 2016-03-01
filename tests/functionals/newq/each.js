describe('newq.each', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should execute the callback for each element in order of resolution', function(done) {
    var expectedVal = 0;

    var chain = createPromiseChain(newq);

    var values = chain.resolveNext(2, 4);
    values.splice(1, 0, 0);
    values = values.reverse();

    // values is [Promise(4), 0, Promise(2)]
    expect(newq.each(values, function(val) {
      expect(val).to.be.equal(expectedVal);
      expectedVal += 2;
    }))
      .to.eventually.be.fulfilled
      .and.to.have.property('length', 3)
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should ignore the value returned by the callback', function(done) {
    expect(newq.each([newq.resolve(4), 0, newq.resolve(2)], function(val) {
      return val * 4;
    }))
      .to.eventually.be.deep.equal([4, 0, 2])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should call the callback with index & array length', function() {
    var spy = sinon.spy();

    newq.each([21, 42], spy);

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledTwice
      .and.to.have.been.calledWithExactly(21, 0, 2)
      .and.to.have.been.calledWithExactly(42, 1, 2)
    ;
  });

  it('should return a decorated promise', function() {
    expect(newq.each([2], function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
