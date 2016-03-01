describe('Promise.filter', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  function filterEven(val) {
    return !(val % 2);
  }

  it('should filter elements of an array', function(done) {
    expect(newq.resolve([1, 2, 3, 4]).filter(filterEven))
      .to.eventually.deep.equal([2, 4])
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
