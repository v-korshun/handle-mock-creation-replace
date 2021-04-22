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
    .with('elements', [
      test
    ])
);
PretenderManager.setResponseMock(
  'get',
  'some-api',
  mocker
    .mockCollection(
      'collection-type'
    ).with('elements', [])
);