describe('newq.props', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should sync every object properties', function(done) {
    expect(newq.props({
      val1: 1,
      val42: newq.resolve(42)
    }))
      .to.eventually.deep.equal({val1: 1, val42: 42})
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.props({}, function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
