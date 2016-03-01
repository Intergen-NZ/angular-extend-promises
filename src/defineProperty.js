'use strict';

module.exports = function defineProperty(obj, name, value) {
  if (Object.defineProperty) {
    try {
      Object.defineProperty(obj, name, {
        value: value
      });
    }
    catch (e) {}
  }

  if (obj[name] !== value)
    obj[name] = value;
};
