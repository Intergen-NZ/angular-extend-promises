describe('Promise.timeout', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should do nothing when the promise resolves before the timeout', function(done) {
    var test = new Error();

    expect(newq.resolve(42).timeout(10))
      .to.eventually.be.equal(42)
      .notify(done)
    ;

    $rootScope.$digest();
  });

  it('should reject the promise with a TimeoutError if the promise resolves ' +
    'after the timeout', function(done) {
    expect(newq.resolve(42).delay(20).timeout(10))
      .to.eventually.be.rejectedWith(newq.TimeoutError, 'Timed out after 10 ms')
      .notify(done)
    ;

    $rootScope.$digest();

    setTimeout($rootScope.$digest.bind($rootScope), 10);
  });

  it('should reject the promise with a TimeoutError and the provided message if ' +
    'the promise resolves after the timeout', function(done) {
    expect(newq.resolve(42).delay(20).timeout(10, 'message'))
      .to.eventually.be.rejectedWith(newq.TimeoutError, 'message')
      .notify(done)
    ;

    $rootScope.$digest();

    setTimeout($rootScope.$digest.bind($rootScope), 10);
  });
});
