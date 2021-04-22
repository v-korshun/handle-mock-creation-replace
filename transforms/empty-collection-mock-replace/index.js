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

  function hasEmptyCollectionMock(node) {
    const isInsideSetResponseMock =
      node.callee &&
      node.callee.object &&
      node.callee.object.name === 'PretenderManager' &&
      node.callee.property &&
      node.callee.property.name === 'setResponseMock';
    if (isInsideSetResponseMock) {
      return node.arguments && node.arguments[2] && isEmptyCollectionMock(node.arguments[2]);
    }
    return false;
  }

  return j(file.source)
    .find(j.CallExpression, hasEmptyCollectionMock)
    .forEach((path) => {
      path.parentPath.replace();
    })
    .toSource();
};

module.exports.type = 'js';
