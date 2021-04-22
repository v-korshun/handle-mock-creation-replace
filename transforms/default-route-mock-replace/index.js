const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

const METHODS = new Set(['post', 'get', 'delete', 'put']);

module.exports = function transformer(file, api) {
  const j = getParser(api);

  function isEmptyCollectionMock(mock) {
    debugger;
    return (
      mock &&
      mock.type === 'CallExpression' &&
      mock.callee &&
      mock.callee.property &&
      mock.callee.property.name === 'with' &&
      mock.callee.object.callee &&
      mock.callee.object.callee.object &&
      mock.callee.object.callee.object.name === 'mocker' &&
      mock.callee.object.callee.property &&
      mock.callee.object.callee.property.name === 'mockCollection' &&
      mock.arguments &&
      mock.arguments[0] &&
      mock.arguments[0].value === 'elements' &&
      mock.arguments[1] &&
      mock.arguments[1].elements &&
      mock.arguments[1].elements.length === 0
    );
  }

  function isDefaultMockWithNoOverrides(context) {
    debugger;
    const { node } = context;
    const method = node && node.elements && node.elements[0];
    const mock = node && node.elements && node.elements[1];
    if (method && method.type === 'StringLiteral' && METHODS.has(method.value)) {
      const isMocker =
        mock &&
        mock.type === 'CallExpression' &&
        mock.callee &&
        mock.callee.object &&
        mock.callee.object.name === 'mocker';
      const isMockingCall =
        mock &&
        mock.type === 'CallExpression' &&
        mock.callee &&
        mock.callee.property &&
        (mock.callee.property.name === 'mockCollection' ||
          mock.callee.property.name === 'mockPDSC' ||
          mock.callee.property.name === 'mockAction');
      console.log(
        `ArrayExpression ${context} - ${
          isMocker && isMockingCall ? 'no overrides' : 'has overrides'
        }`
      );
      if (isMocker && isMockingCall) {
        return true;
        // Collection override with elements as empty Array
      } else if (isEmptyCollectionMock(mock)) {
        return true;
      }
      return false;
    }
  }

  return j(file.source)
    .find(j.ArrayExpression, isDefaultMockWithNoOverrides)
    .forEach((path) => {
      debugger;
      console.log(path.parentPath);
      path.parentPath.replace();
    })
    .toSource();
};

module.exports.type = 'js';
