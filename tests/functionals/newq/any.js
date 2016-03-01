describe('newq.any', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return the first value to resolve', function(done) {
    var chain = createPromiseChain(newq);

    expect(newq.any(chain.resolveNext(1, 2).reverse()))
      .to.eventually.be.deep.equal(1)
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should return a decorated promise', function() {
    expect(newq.any([2], function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
