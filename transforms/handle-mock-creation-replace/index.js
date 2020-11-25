const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  function hasEmptyHandleMockCreation({ callee, arguments: args }) {
    const isSetResponseMock =
      callee.object &&
      callee.object.name === 'PretenderManager' &&
      callee.property.name === 'setResponseMock';
    if (!isSetResponseMock) {
      return false;
    }
    const mock = args[2];
    const options = args[3];
    const isEmptyHandleMock =
      mock &&
      mock.callee &&
      mock.callee.name === 'handleMockCreation' &&
      mock.arguments.length === 0;
    const httpCodeProperty =
      options && options.properties.filter((option) => option.key.name === 'code')[0];
    const hasSuccessCodeVarriable =
      httpCodeProperty &&
      httpCodeProperty.value.property &&
      httpCodeProperty.value.property.name.indexOf('200') !== -1;
    const hasRawSuccessCode = httpCodeProperty && httpCodeProperty.value.value === 200;
    const isSuccessMock = !options || hasSuccessCodeVarriable || hasRawSuccessCode;

    return isEmptyHandleMock && isSuccessMock;
  }

  function isAutoMockEnabled(node) {
    return (
      node.type === 'CallExpression' &&
      node.callee &&
      node.callee.object &&
      node.callee.object.name === 'PretenderManager' &&
      node.callee.property.name === 'enableAutoMockCreation'
    );
  }

  return j(file.source)
    .find(j.CallExpression, hasEmptyHandleMockCreation)
    .forEach((path) => {
      path.parentPath.replace();
      debugger;
      const mockEnabledStatements = path.parentPath.parentPath.value.filter((statement) =>
        isAutoMockEnabled(statement.expression)
      );
      if (!mockEnabledStatements.length) {
        path.parentPath.insertAfter(
          j.expressionStatement(
            j.callExpression(
              j.memberExpression(
                j.identifier('PretenderManager'),
                j.identifier('enableAutoMockCreation')
              ),
              []
            ),
            []
          )
        );
      }
    })
    .toSource();
};

module.exports.type = 'js';
