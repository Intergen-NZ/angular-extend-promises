describe('Promise.props', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it("should synchronize an object's properties", function(done) {
    expect(newq.resolve({
      val: 42,
      prom: newq.resolve(2)
    }).props())
      .to.eventually.be.deep.equal({
        val: 42,
        prom: 2
      })
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy).to.have.been.calledWithExactly(null, 42);
  });
});
