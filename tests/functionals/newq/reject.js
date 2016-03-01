describe('newq.reject', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return a rejected promise', function(done) {
    expect(newq.reject(42))
      .to.eventually.be.rejected
      .and.to.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.reject(42))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
