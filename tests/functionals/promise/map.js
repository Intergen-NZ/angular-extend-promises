describe('Promise.map', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  function add1(val) {
    return val + 1;
  }

  it('should be able to map a value returned by a promise', function(done) {
    expect(newq.resolve([1, 3]).map(add1))
      .to.eventually.deep.equal([2, 4])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should be able to map a value returned by newq.map', function(done) {
    expect(newq.map([1, 3], add1).map(add1))
      .to.eventually.deep.equal([3, 5])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should be able to map a value returned by another promise.map', function(done) {
    expect(newq.resolve([1, 3]).map(add1).map(add1))
      .to.eventually.deep.equal([3, 5])
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should flow promises down maps asynchronously after a newq.map', function(done) {
    newq.map([newq.defer().promise, 1], function(val) {
      return val;
    })
      .map(add1)
      .map(function(val) {
        expect(val).to.be.equal(2);
        done();
      })
    ;

    $rootScope.$digest();
  });

  it('should flow promises down maps asynchronously after a promise.map', function(done) {
    newq.resolve([newq.defer().promise, 2])
      .map(add1)
      .map(function(val) {
        expect(val).to.be.equal(3);
        done();
      })
    ;

    $rootScope.$digest();
  });

  it('should call the callback with index & array length', function() {
    var spy = sinon.spy();

    newq.resolve([21, 42]).map(spy);

    $rootScope.$digest();

    expect(spy)
      .to.have.been.calledTwice
      .and.to.have.been.calledWithExactly(21, 0, 2)
      .and.to.have.been.calledWithExactly(42, 1, 2)
    ;
  });
});
