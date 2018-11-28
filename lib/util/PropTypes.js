'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactIs = require('react-is');

exports.default = {
  component: getComponentValidator()

  // source: https://github.com/facebook/prop-types/issues/200#issuecomment-409391696
};
function getComponentValidator() {
  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError() {
    for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
      message[_key] = arguments[_key];
    }

    this.message = message.join('');
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var val = props[propName];
    if (val == null) {
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError('The ' + location + ' \'' + propFullName + '\' is marked as required in ', '\'' + componentName + '\', but its value is \'null\'.');
        }
        return new PropTypeError('The ' + location + ' \'' + propFullName + '\' is marked as required in ', '\'' + componentName + '\', but its value is \'undefined\'.');
      }
    } else if (!(0, _reactIs.isValidElementType)(val)) {
      return new PropTypeError('Invalid ' + location + ' \'' + propFullName + '\' supplied to ' + componentName + '. ', 'Expected a string (for built-in components) or a class/function ', '(for composite components).');
    }
    return null;
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}