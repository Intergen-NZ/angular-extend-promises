describe('Promise.bind', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should bind this in the next callback', function(done) {
    var test = {};
    expect(newq.resolve(42).bind(test).then(function() {
      expect(this).to.be.equal(test);
    }))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should also bind following promises', function(done) {
    var test = {};
    expect(newq.resolve(42).bind(test).then(function() {}).then(function() {
      expect(this).to.be.equal(test);
    }))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
