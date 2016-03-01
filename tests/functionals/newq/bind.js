describe('newq.bind', function() {
  var newq;
  var $rootScope;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    newq = $q;
    $rootScope = _$rootScope_;
  }));

  it('should act like .resolve().bind', function(done) {
    var res = {};

    expect(newq.bind(res).then(function() {
      expect(this).to.be.equal(res);
    }))
      .to.eventually.be.fulfilled
      .notify(done)
    ;

    $rootScope.$digest();
  });
});
