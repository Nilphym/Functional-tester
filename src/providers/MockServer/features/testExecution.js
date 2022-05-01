/* eslint-disable no-console */
import { Model } from 'miragejs';

const models = {
  errorTest: Model
};

const routes = [
  (thisRef) =>
    thisRef.get('Errors/ErrorTest/:errorId', (schema, request) => {
      const { errorId } = request.params;
      return schema.errorTests.findBy({ testId: errorId }).attrs;
    }),

  (thisRef) =>
    thisRef.get('Tests/TestExecution/:testId', (schema, request) => {
      const { testId } = request.params;
      return schema.errorTests.findBy({ testId }).attrs;
    }),

  (thisRef) =>
    thisRef.put('Tests/:testId/execute', (schema, request) => {
      const { testId } = request.params;
      console.log(`testId: ${testId} || executionCounter + 1`);
    })
];

const seeds = [
  (serverRef) =>
    [
      '22bd1f84-b9e5-4183-9502-036eafe67622',
      '72AD77FC-B88D-4EC6-A757-A6A3864BAFFF',
      'A7C33D4D-AC7B-4353-B192-596D70327625',
      '2B7846E7-98A5-42E2-9E5C-C7D9BB779F25',
      '5CE3FE96-872C-4541-A420-EA35F77A13E2',
      '9D663266-3805-47F8-AFFA-0B17F1B78CCF',
      '5AE2C988-F058-4555-ADF5-3B0F66326B2F',
      'C9F996F3-6459-485E-8F30-E314FE6CC4BA',
      '50C07E32-DEC9-4EBD-8DD1-30C631729BB2',
      '99E4D145-5BA1-4FF1-BB60-C9D5A408C7C7',
      'D9C27689-268B-4623-AFE2-53CC920B73EB',
      '1DB009F5-02B9-4B6B-8A00-B9346D07DB1D',
      'BA4E6298-ADEF-40F6-9880-C6389C63436C'
    ].forEach((id) =>
      serverRef.create('errorTest', {
        testId: id,
        testName: 'Checking developer navigation',
        testCaseProconditions: 'You must be logged in as developer',
        testCaseEntryData: [
          'user name: Witcher3',
          {
            name: 'user data',
            table: [
              ['', 'x', 'y'],
              ['z', 'c', 'v'],
              ['b', 'n', 'm']
            ]
          },
          {
            name: 'another important data',
            table: [
              ['', 'x', 'y'],
              ['z', 'c', 'v'],
              ['b', 'n', 'm']
            ]
          }
        ],
        result: 'You can navigate through the page',
        steps: [
          {
            id: '6DA9B19C-1E8B-4E09-8CBE-02B9EE7DC9CB',
            name: 'Click on the navigation button',
            controlPoint: 'You will be redirected to the home page',
            testData: [],
            errorIds: [
              'BA4E6298-ADEF-40F6-9880-C6389C63436C',
              '72AD77FC-B88D-4EC6-A757-A6A3864BAFFF'
            ]
          },
          {
            id: 'DC5B4C9E-F072-4DCB-8A94-C48D30548B84',
            name: 'Input the data',
            testData: [
              {
                name: 'Very important data',
                table: [
                  ['', 'x', 'y'],
                  ['z', 'c', 'v'],
                  ['b', 'n', 'm']
                ]
              }
            ],
            errorIds: []
          }
        ]
      })
    )
];

export default { models, routes, seeds };
