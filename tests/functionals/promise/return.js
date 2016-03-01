describe('Promise.return', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return the provided value discarding the previous one', function(done) {
    expect(newq.resolve(21).return(42))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
