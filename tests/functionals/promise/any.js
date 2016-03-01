describe('Promise.any', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should resolve with the first promise that resolves', function(done) {
    expect(newq.resolve([newq.resolve(1), newq.resolve(2)]).any())
      .to.eventually.be.equal(1)
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
