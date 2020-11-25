import { handleMockCreation } from 'app-test-helpers/test-support/handle-mock-creation';
import { httpStatus } from 'restli-utils';
import PretenderManager from 'app-test-helpers/test-support/pretender/pretender-manager';

module('Acceptance | Routes | route', function () {
  PretenderManager.setResponseMock(
    'get',
    'some/api/test',
    handleMockCreation(),
    {
      code: 200,
    }
  );
  PretenderManager.setResponseMock(
    'get',
    'some/api/test',
    handleMockCreation(),
    {
      code: httpStatus.S_200_OK,
    }
  );
  PretenderManager.setResponseMock(
    'get',
    'some/api/test',
    handleMockCreation(),
    {
      code: 500,
    }
  );
  PretenderManager.setResponseMock(
    'get',
    'some/api/test',
    handleMockCreation({
      test: 'smth',
    }),
    {
      code: 200,
    }
  );
  PretenderManager.setResponseMock(
    'get',
    'some/api/test',
    handleMockCreation(),
    {
      someProp: true,
    }
  );
});
