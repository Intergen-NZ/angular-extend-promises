describe('Promise.delay', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should delay by x ms the promise flow', function(done) {
    var stub = sinon.stub().returnsArg(0);

    expect(newq.resolve(42).delay(10).then(stub))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();

    expect(stub).to.not.have.been.called;

    setTimeout(function() {
      $rootScope.$digest();
      expect(stub).to.have.been.called;
    }, 10);
  });
});
