describe('Promise.catch', function() {
  'use strict';

  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  function createError() {
    function SubError() {};
    SubError.prototype = Object.create(Error.prototype);

    return SubError;
  }

  function createPredicate(prom) {
    return function(err) {
      return !!err[prom];
    }
  }

  it('should be called on errors', function(done) {
    var test = new Error();

    expect(newq.reject(test).catch(function(err) {
      expect(err).to.be.equal(test);
    }))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should allow to catch only a specific error', function(done) {
    var MyError1 = createError();
    var MyError2 = createError();

    var spy1 = sinon.spy();
    var spy2 = sinon.spy(function(err) {
      expect(err).to.be.an.instanceOf(MyError2);
    });

    expect(newq.reject(new MyError2()).catch(MyError1, spy1).catch(MyError2, spy2))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy1).to.not.have.been.called;
    expect(spy2).to.have.been.calledOnce;
  });

  it('should allow to catch errors validating a given predicate', function(done) {
    var test = new Error();
    test.prop2 = true;

    var spy1 = sinon.spy();
    var spy2 = sinon.spy(function(err) {
      expect(err).to.be.equal(test);
    });

    expect(newq.reject(test).catch(createPredicate('prop1'), spy1).catch(createPredicate('prop2'), spy2))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy1).to.not.have.been.called;
    expect(spy2).to.have.been.calledOnce;
  });

  it('should support multiple error & predicates conditions', function(done) {
    var test = new Error();

    var spy1 = sinon.spy();
    var spy2 = sinon.spy(function(err) {
      expect(err).to.be.equal(test);
    });

    expect(newq.reject(test).catch(createPredicate('prop1'), createPredicate('prop2'), Error, spy2))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();

    expect(spy1).to.not.have.been.called;
    expect(spy2).to.have.been.calledOnce;
  });
});
