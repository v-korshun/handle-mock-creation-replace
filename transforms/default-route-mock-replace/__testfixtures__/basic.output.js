function test() {
  return {
    'empty-collection': () => ({
      'api/url': [
        'get',
        mocker
          .mockCollection(
            'type'
          )
          .with('elements', [testObj])
      ],
    }),
  }
}