const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  function hasEmptyHandleMockCreation({ callee, arguments: args }) {
    const isSetResponseMock =
      callee.object &&
      callee.object.name === 'PretenderManager' &&
      callee.property &&
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
      options &&
      options.properties &&
      options.properties.filter((option) => option.key && option.key.name === 'code')[0];
    const hasSuccessCodeVarriable =
      httpCodeProperty &&
      httpCodeProperty.value &&
      httpCodeProperty.value.property &&
      httpCodeProperty.value.property.name.indexOf('200') !== -1;
    const hasRawSuccessCode =
      httpCodeProperty && httpCodeProperty.value && httpCodeProperty.value.value === 200;
    const isSuccessMock = !options || hasSuccessCodeVarriable || hasRawSuccessCode;

    return isEmptyHandleMock && isSuccessMock;
  }

  return j(file.source)
    .find(j.CallExpression, hasEmptyHandleMockCreation)
    .forEach((path) => {
      path.parentPath.replace();
    })
    .toSource();
};

module.exports.type = 'js';
