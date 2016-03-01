describe('newq()', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should return a promise', function() {
    expect(newq(_.noop))
      .to.have.property('then')
        .that.is.a('Function')
    ;
  });

  it('should throw an error if resolver is not a function', function() {
    var fn = function() {
      newq();
    };

    expect(fn).to.throw(Error, 'resolver should be a function');
  });

  it('should resolve the promise when resolve is called', function(done) {
    expect(newq(function(resolve) {
      resolve(42);
    }))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should reject the promise when reject is called', function(done) {
    expect(newq(function(resolve, reject) {
      reject(new Error('error'));
    }))
      .to.eventually.be.rejectedWith(Error, 'error')
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
