describe('newq.some', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return the x first promises to resolve in resolution order', function(done) {
    var chain = createPromiseChain(newq);

    expect(newq.some(chain.resolveNext(2, 3, 4).reverse(), 2))
      // 1 is after 2 because it will resolve on the same tick but 2 is
      // before 1 in the values array
      .to.eventually.be.deep.equal([2, 3])
      .notify(done)
    ;

    chain.play($rootScope);
  });

  it('should reject the promise with an AggregationError when the array is too short', function(done) {
    expect(newq.some([], 1))
      .to.eventually.be.rejectedWith(
        newq.AggregationError,
        'initial array length (0) > count (1)'
      )
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.some([], 0))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
