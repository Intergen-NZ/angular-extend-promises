describe('Promise.finally', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should be called on normal flow without any argument', function(done) {
    var spy = sinon.spy();

    expect(newq.resolve([1, 3]).finally(spy))
      .to.eventually.deep.equal([1, 3])
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledOnce
      .and.to.have.been.calledWithExactly()
    ;
  });

  it('should be called on error flow without any argument', function(done) {
    var spy = sinon.spy();

    expect(newq.reject(new Error()).finally(spy))
      .to.eventually.be.rejected
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledOnce
      .and.to.have.been.calledWithExactly()
    ;
  });

  it('should synchronize the promise returned by finally if there is one', function(done) {
    var stubFinally = sinon.stub().returns(newq.resolve().delay(10));
    var stubThen = sinon.stub().returnsArg(0);

    expect(newq.resolve(42).finally(stubFinally).then(stubThen))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();

    expect(stubFinally)
      .to.have.been.calledOnce
      .and.to.have.been.calledWithExactly()
    ;

    expect(stubThen).to.not.have.been.called;

    setTimeout(function() {
      $rootScope.$digest();
      expect(stubThen).to.have.been.calledWith(42);
    }, 10);
  });
});
