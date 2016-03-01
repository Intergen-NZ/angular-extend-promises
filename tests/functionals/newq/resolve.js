describe('newq.resolve', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return a resolved promise', function(done) {
    expect(newq.resolve(42))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.resolve(42))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
