function test() {
  return {
    'empty-collection': () => ({
      'api/url': [
        'get',
        mocker
          .mockCollection(
            'type'
          )
          .with('elements', []),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
      'api/url': [
        'get',
        mocker
          .mockCollection(
            'type'
          )
          .with('elements', [testObj])
      ],
      'api/url': [
        'get',
        mocker
          .mockCollection(
            'type'
          )
      ],
    }),
    'entity-mock': () => ({
      'api/url': [
        'get',
        mocker
          .mockPDSC('type')
          .with('field', 'value'),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
      'api/url': [
        'get',
        mocker
          .mockPDSC('type'),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
      'api/url': [
        'get',
        mocker
          .mockPDSC('type', 'value'),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
      'api/url': [
        'get',
        mocker
          .mockAction('type'),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
      'api/url': [
        'get',
        mocker
          .mockAction('type')
          .with('field', 'value'),
        {
          isStrictQueryParamMatchingDisabled: true,
        }
      ],
    }),
  };
}