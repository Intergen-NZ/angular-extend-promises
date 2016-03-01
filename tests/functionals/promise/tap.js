describe('Promise.tap', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should call the method with the value & ignore result', function(done) {
    var spy = sinon.stub().returns(42);

    expect(newq.resolve([1, 3]).tap(spy))
      .to.eventually.be.deep.equal([1, 3])
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy).to.have.been.calledWithExactly([1, 3]);
  });
});
