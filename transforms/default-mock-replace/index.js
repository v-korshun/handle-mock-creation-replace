const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  function isEmptyCollectionMock(mock) {
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

  function hasDefaultMockCreation(node) {
    const isInsideSetResponseMock =
      node.callee &&
      node.callee.object &&
      node.callee.object.name === 'PretenderManager' &&
      node.callee.property &&
      node.callee.property.name === 'setResponseMock';
    if (isInsideSetResponseMock) {
      const isDefaultMock =
        node.arguments &&
        node.arguments[2] &&
        node.arguments[2].arguments &&
        node.arguments[2].arguments.length === 1 &&
        node.arguments[2].callee &&
        node.arguments[2].callee.object &&
        node.arguments[2].callee.object.name === 'mocker' &&
        node.arguments[2].callee.property &&
        (node.arguments[2].callee.property.name === 'mockPDSC' ||
          //node.arguments[2].callee.property.name === 'mockCollection' ||
          node.arguments[2].callee.property.name === 'mockAction');
      if (node.arguments && node.arguments[2] && isEmptyCollectionMock(node.arguments[2])) {
        return true;
      }
      return isDefaultMock;
    }
    return false;
  }

  return j(file.source)
    .find(j.CallExpression, hasDefaultMockCreation)
    .forEach((path) => {
      path.parentPath.replace();
    })
    .toSource();
};

module.exports.type = 'js';
