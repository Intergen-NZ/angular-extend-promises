describe('Promise.all', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should synchronize an array of promises or values', function(done) {
    expect(newq.resolve([newq.resolve(1), 2]).all())
      .to.eventually.be.deep.equal([1, 2])
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
