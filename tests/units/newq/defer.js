'use strict';

describe('newq.defer', function() {
  var defer;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    defer = $q.defer;
    $rootScope = _$rootScope_;
  }));

  it('should be a function', function() {
    expect(defer).to.be.a('Function');
  });

  describe('#return', function() {
    var returnValue;

    beforeEach(function() {
      returnValue = defer();
    });

    it('should be an object', function() {
      expect(returnValue).to.be.a('Object');
    });

    describe('.promise', function() {
      it('should be a promise', function() {
        expect(returnValue)
          .to.have.a.property('promise')
          .that.is.an('Object')
            .that.has.a.property('then')
            .that.is.a('Function')
        ;
      });

      // Check that every method we need is on the object
      [
        'all',
        'all',
        'any',
        'bind',
        'call',
        'catch',
        'delay',
        'done',
        'each',
        'filter',
        'finally',
        'get',
        'map',
        'props',
        'spread',
        'tap',
        'throw',
        'timeout',
        'reduce',
        'return',
        'some'
      ].forEach(function(method) {
        it('should expose a ' + method + ' method', function() {
          expect(returnValue.promise)
            .to.have.a.property(method)
            .that.is.a('Function')
          ;
        });
      });
    });

    describe('.resolve', function() {
      it('should be a function', function() {
        expect(returnValue)
          .to.have.a.property('resolve')
          .that.is.a('Function')
        ;
      });

      it('should resolve the provided promise with the given value', function(done) {
        var testObj = {};

        // Resolve won't happen now but in next tick
        returnValue.resolve(testObj);

        expect(returnValue.promise)
          .to.eventually.be.equal(testObj)
          .notify(done)
        ;

        $rootScope.$digest();
      });
    });

    describe('.reject', function() {
      it('should be a function', function() {
        expect(returnValue)
          .to.have.a.property('reject')
          .that.is.a('Function')
        ;
      });

      it('should reject the provided promise with the given value', function(done) {
        var testObj = {};

        // Resolve won't happen now but in next tick
        returnValue.reject(testObj);

        expect(returnValue.promise)
          .to.eventually.be.rejected
          .and.be.equal(testObj)
          .notify(done)
        ;

        $rootScope.$digest();
      });
    });

    describe('.notify', function() {
      it('should be a function', function() {
        expect(returnValue)
          .to.have.a.property('notify')
          .that.is.a('Function')
        ;
      });

      it('should notify progress on the provided promise', function(done) {
        var spy = sinon.spy();

        // Resolve won't happen now but in next tick
        returnValue.promise.then(null, null, spy).then(function() {
          expect(spy).to.have.been.calledOnce.and.calledWith(50);

          done();
        });

        returnValue.notify(50);
        returnValue.resolve(true);

        $rootScope.$digest();
      });
    });
  });
});
