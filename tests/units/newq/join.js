'use strict';

describe('newq.join', function() {
  var join;
  var newQMock;

  beforeEach(module('angular-extend-promises'));
  beforeEach(inject(function($q, _$rootScope_) {
    join = $q.join;
    newQMock = sinon.mock($q);
  }));
  afterEach(function() {
    newQMock.restore();
  });

  it('should be a function', function() {
    expect(join).to.be.a('Function');
  });

  it('should call newq.all with all arguments but the last in an array', function() {
    newQMock.expects('all')
      .once()
      .withArgs([1, 2, 3])
      .returns({spread: function() {}})
    ;

    join(1, 2, 3, function() {});

    newQMock.verify();
  });

  it('should call spread on the return value of newq.all with the provided callback', function() {
    var mock = {
      spread: sinon.spy(function() {})
    };

    newQMock.expects('all').returns(mock);

    function cb() {}
    join(1, cb);

    expect(mock.spread)
      .to.have.been.calledOnce
      .and.to.have.been.calledWith(cb)
    ;
  });

  it('should return the promise returned by the call to spread', function() {
    var expectedRes = {};

    newQMock.expects('all')
      .returns({spread: function() {
        return expectedRes;
      }})
    ;

    expect(join(1, function() {})).to.be.equal(expectedRes);
  });
});
