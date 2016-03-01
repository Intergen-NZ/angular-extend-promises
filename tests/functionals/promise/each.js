describe('Promise.each', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  function add1(val) {
    return val + 1;
  }

  it('should be able to iterate over a value returned by a promise', function(done) {
    expect(newq.resolve([1, 3]).each(add1))
      .to.eventually.deep.equal([1, 3])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should be able to iterate over a value returned by newq.each', function(done) {
    expect(newq.each([1, 3], add1).each(add1))
      .to.eventually.deep.equal([1, 3])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should be able to iterate over a value returned by another promise.each', function(done) {
    expect(newq.resolve([1, 3]).each(add1).each(add1))
      .to.eventually.deep.equal([1, 3])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should flow promises down each asynchronously after a newq.each', function(done) {
    newq.each([newq.defer().promise, 1], function(val) {
      return val;
    })
      .each(add1)
      .each(function(val) {
        expect(val).to.be.equal(1);
        done();
      })
    ;

    $rootScope.$digest();
  });

  it('should flow promises down each asynchronously after a promise.each', function(done) {
    newq.resolve([newq.defer().promise, 2])
      .each(add1)
      .each(function(val) {
        expect(val).to.be.equal(2);
        done();
      })
    ;

    $rootScope.$digest();
  });

  it('should call the callback with index & array length', function() {
    var spy = sinon.spy();

    newq.resolve([21, 42]).each(spy);

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledTwice
      .and.to.have.been.calledWithExactly(21, 0, 2)
      .and.to.have.been.calledWithExactly(42, 1, 2)
    ;
  });
});
