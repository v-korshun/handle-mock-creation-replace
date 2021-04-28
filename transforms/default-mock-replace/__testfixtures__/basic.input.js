PretenderManager.setResponseMock(
  'post',
  'some-api',
  mocker.mockAction('boolean').with({ value: true })
);
PretenderManager.setResponseMock(
  'post',
  'some-api',
  mocker.mockAction('boolean')
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker
    .mockCollection(
      'collection-type'
    )
    .with('elements', [
      mocker
        .mockPDSC(
          'type'
        ),
    ])
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker
    .mockCollection(
      'collection-type'
    )
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker
    .mockCollection(
      'collection-type'
    ).with('elements', [])
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker.mockPDSC('type')
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker.mockPDSC('type').with('value', 1)
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker.mockPDSC('some-type', {})
);