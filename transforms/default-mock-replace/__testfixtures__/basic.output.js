PretenderManager.setResponseMock(
  'post',
  'some-api',
  mocker.mockAction('boolean').with({ value: true })
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
  mocker.mockPDSC('type').with('value', 1)
);