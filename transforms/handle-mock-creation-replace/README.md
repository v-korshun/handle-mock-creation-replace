# handle-mock-creation-replace

Replaces `handleMockCreation()` calls with `PretenderManager.enableAutoMockCreation()`. This allows to auto handle the request without explicitly specifying mock.

## Usage

```
npx infra handle-mock-creation-replace path/of/files/ or/some**/*glob.js

# or

yarn global add infra
infra handle-mock-creation-replace path/of/files/ or/some**/*glob.js
```

## Local Usage

```
node ./bin/cli.js handle-mock-creation-replace path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [basic](#basic)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/handle-mock-creation-replace/__testfixtures__/basic.input.js)</small>):
```js
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

```

**Output** (<small>[basic.output.js](transforms/handle-mock-creation-replace/__testfixtures__/basic.output.js)</small>):
```js
import { handleMockCreation } from 'app-test-helpers/test-support/handle-mock-creation';
import { httpStatus } from 'restli-utils';
import PretenderManager from 'app-test-helpers/test-support/pretender/pretender-manager';

module('Acceptance | Routes | route', function () {
  PretenderManager.enableAutoMockCreation();
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
```
<!--FIXTURES_CONTENT_END-->