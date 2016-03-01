describe('Promise.reduce', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  function add(a, b) {
    return a + b;
  }

  it('should reduce the resolved array', function(done) {
    expect(newq.resolve([1, 2, 3]).reduce(add, 1))
      .to.eventually.be.equal(7)
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
