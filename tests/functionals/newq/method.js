describe('newq.method', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should keep the object context', function() {
    var obj = {
      test: newq.method(function() {
        expect(this).to.be.equal(obj);
      })
    };

    obj.test();
  });

  it('should pass on the provided arguments', function() {
    var obj = {
      test: newq.method(function(a, b) {
        expect(b).to.be.equal(42);
      })
    };

    obj.test(1, 42);
  });

  it('should accept a promise as return value', function(done) {
    var expectedRes = newq.resolve(42);

    var obj = {
      test: newq.method(function() {
        return expectedRes;
      })
    };

    expect(obj.test())
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should convert a primitiive return value in a promise', function() {
    var obj = {
      test: newq.method(function() {
        return 42;
      })
    };

    expect(obj.test()).to.have.a.property('then');
  });

  it('should return a rejected promise on throw', function(done) {
    var obj = {
      test: newq.method(function() {
        throw 42;
      })
    };

    expect(obj.test())
      .to.eventually.be.rejected
      .and.to.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should return a decorated promise', function() {
    var obj = {
      test: newq.method(function() {})
    };

    expect(obj.test())
      .to.have.deep.property('constructor.name', 'Promise')
    ;
  });
});
