describe('newq.when', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should accept a primitive as argument', function(done) {
    expect(newq.when(42))
      .to.eventually.be.equal(42)
      .notify(done);

    $rootScope.$digest();
  });

  it('should accept a promise as argument', function(done) {
    expect(newq.when(newq.resolve(42)))
      .to.eventually.be.equal(42)
      .notify(done);

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.when(42))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
