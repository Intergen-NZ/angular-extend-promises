describe('Promise.throw', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should reject the promise with the provided value', function(done) {
    var test = new Error();

    expect(newq.resolve(42).throw(test))
      .to.eventually.be.rejected
      .and.to.be.equal(test)
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
