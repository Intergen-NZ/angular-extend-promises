describe('Promise.get', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return the value of the given property of the resolved value', function(done) {
    var test = {
      prop: 42
    };

    expect(newq.resolve(test).get('prop'))
      .to.eventually.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
