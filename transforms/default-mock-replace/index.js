const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);

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
        node.arguments[2].callee &&
        node.arguments[2].callee.object &&
        node.arguments[2].callee.object.name === 'mocker' &&
        node.arguments[2].callee.property &&
        (node.arguments[2].callee.property.name === 'mockPDSC' ||
          node.arguments[2].callee.property.name === 'mockCollection' ||
          node.arguments[2].callee.property.name === 'mockAction');
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
