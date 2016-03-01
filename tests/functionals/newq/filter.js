describe('newq.filter', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should filter the array of values with the given callback', function(done) {
    var chain = createPromiseChain(newq);

    expect(newq.filter(chain.resolveNext(21).concat(42), function(val) {
      return chain.resolveNext(val % 2)[0];
    }))
      .to.eventually.be.deep.equal([21])
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should return a decorated promise', function() {
    expect(newq.filter([2], function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
