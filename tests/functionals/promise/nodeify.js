describe('Promise.nodeify', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should call the provided callback with (null, value) on normal flow', function(done) {
    var spy = sinon.spy();

    expect(newq.resolve(42).nodeify(spy))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy).to.have.been.calledWithExactly(null, 42);
  });

  it('should call the provided callback with (null, [values]) on normal flow when ' +
    'the value is an array', function(done) {
    var spy = sinon.spy();

    expect(newq.resolve([42, 21]).nodeify(spy))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy).to.have.been.calledWithExactly(null, [42, 21]);
  });

  it('should call the provided callback with (null, value...) on normal flow when ' +
    'the value is an array and option spread is true', function(done) {
    var spy = sinon.spy();

    expect(newq.resolve([42, 21]).nodeify(spy, {spread: true}))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy).to.have.been.calledWithExactly(null, 42, 21);
  });
});
