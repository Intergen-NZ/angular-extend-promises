describe('newq.try', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should set the provided context', function() {
    var res = {};
    newq.try(function() {
      expect(this).to.be.equal(res);
    }, [], res);
  });

  it('should pass on the provided arguments', function() {
    newq.try(function(a, b) {
      expect(b).to.be.equal(42);
    }, [1, 42]);
  });

  it('should accept a promise as return value', function(done) {
    var res = newq.try(function(a, b) {
      return newq.resolve(42);
    });

    expect(res)
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should convert a primitiive return value in a promise', function() {
    var res = newq.try(function(a, b) {
      return 42;
    });

    expect(res).to.have.a.property('then');
  });

  it('should return a rejected promise on throw', function(done) {
    var res = newq.try(function(a, b) {
      throw 42;
    });

    expect(res)
      .to.eventually.be.rejected
      .and.to.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    expect(newq.try(function() {}))
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
