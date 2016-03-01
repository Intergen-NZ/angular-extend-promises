'use strict';

var NewQError = module.exports.NewQError = function NewQError(message) {
  this.name = this.constructor.name;
  Error.apply(this, arguments);
  this.message = message;
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, this.constructor);
  else
    this.stack = (new Error()).stack;
};

NewQError.prototype.toString = function() {
    return this.stack.toString();
};

NewQError.subError = function subError(SubError, Parent) {
  Parent = Parent || NewQError;

  function F() {}
  F.prototype = Parent.prototype;
  SubError.prototype = new F();
  SubError.prototype.constructor = SubError;

  if (SubError.subError)
    return;

  SubError.subError = function subError(SubSubError) {
    NewQError.subError(SubSubError, SubError);
  };
};

NewQError.subError(NewQError, Error);

var AggregateError = module.exports.AggregateError = function AggregateError() {
  NewQError.apply(this, arguments);
};
NewQError.subError(AggregateError);

var TimeoutError = module.exports.TimeoutError = function TimeoutError() {
  NewQError.apply(this, arguments);
};
NewQError.subError(TimeoutError);
