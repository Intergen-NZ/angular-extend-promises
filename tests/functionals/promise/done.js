describe('Promise.done', function() {
  var newq;
  var $rootScope;

  beforeEach(module(function($exceptionHandlerProvider) {
    $exceptionHandlerProvider.mode('log');
  }));
  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));
  afterEach(function() {
    if (!window.setTimeout.restore)
      return;
    window.setTimeout.restore();
  });

  function setTimeoutStub(error, done) {
    var t = setTimeout(done, 100, 'Global error not sent');

    sinon.stub(window, 'setTimeout', function(fn) {
      expect(fn).to.throw(error);

      clearTimeout(t);
      done();
    });
  }

  it('should throw a global error when a rejected value goes through done', function(done) {
    var myError = new Error('flowTest');

    setTimeoutStub(myError, done);

    newq.reject(myError).done();

    $rootScope.$digest();
  });

  it('should throw a global error when the callback returns a rejected promise', function(done) {
    var myError = new Error('resolveTest');

    setTimeoutStub(myError, done);

    newq.resolve(42).done(function() {
      return newq.reject(myError);
    });

    $rootScope.$digest();
  });

  it('should throw a global error when the callback throws', function(done) {
    var myError = new Error('throwTest');

    setTimeoutStub(myError, done);

    newq.resolve(42).done(function() {
      throw myError;
    });

    $rootScope.$digest();
  });
});
