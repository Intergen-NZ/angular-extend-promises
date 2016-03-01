describe('Promise.some', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return the x first promises to resolve in order of resolution', function(done) {
    expect(newq.resolve([newq.resolve(1).delay(5), 2, newq.resolve(2).delay(10)]).some(2))
      .to.eventually.be.deep.equal([2, 1])
      .notify(done)
    ;

    $rootScope.$digest();
    setTimeout($rootScope.$digest.bind($rootScope), 5);
  });
});
