describe('Promise.call', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should call the method provided with the correct context & arguments', function(done) {
    var test = {
      method: sinon.spy()
    };

    expect(newq.resolve(test).call('method', 21, 42).then(function() {
      expect(test.method)
        .to.have.been.calledOnce
        .and.to.have.been.calledWith(21, 42)
        .and.to.have.been.calledOn(test)
      ;
    }))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
