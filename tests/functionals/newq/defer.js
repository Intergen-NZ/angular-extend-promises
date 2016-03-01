describe('newq.defer', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return an object containing a promise that can be resolved with resolve', function(done) {
    var def = newq.defer();
    def.resolve(42);

    expect(def.promise)
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return an object containing a promise that can be rejected with reject', function(done) {
    var def = newq.defer();
    def.reject(42);

    expect(def.promise)
      .to.eventually.be.rejected
      .and.to.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.defer().promise)
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
