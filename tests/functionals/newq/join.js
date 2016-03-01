describe('newq.join', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should act as all then spread', function(done) {
    expect(newq.join(2, newq.resolve(40), function(a, b) {
      return a + b;
    }))
      .to.eventually.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.join(2, function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
