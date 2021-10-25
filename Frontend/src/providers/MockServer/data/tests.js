/* eslint-disable no-console */
import {
  Model
} from 'miragejs';

const models = {
  testStep: Model,
  testProcedure: Model,
  testCase: Model,
  test: Model,
  testPlan: Model
};

const routes = [

  // TestSuites requests
   (thisRef) =>
   thisRef.post('TestSuites', (schema, request) => {
     const newTestSuiteId = Math.floor(Math.random() * 10000);
     const { testPlanId, newTestSuiteName } = JSON.parse(request.requestBody);

     const newTestSuite = {
       testSuiteId: newTestSuiteId,
       testSuite: newTestSuiteName
     };

     const {
       testSuites
     } = schema.testPlans.findBy({
       id: testPlanId
     }).attrs;

     schema.testPlans.findBy({ id: testPlanId }).update({
       testSuites: [
         ...testSuites,
          newTestSuite
       ]
     });
   }),

  // TestPlans requests
  (thisRef) =>
  thisRef.get('TestPlans/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.testPlans.findBy({
      id
    }).attrs;

    const tests = [];
    findingItem.testsIds.forEach(id => {
      const test = schema.tests.findBy({
        id
      }).attrs;
      tests.push(test);
    });

    findingItem.tests = tests;

    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('TestPlans/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      name,
      testSuites
    } = JSON.parse(
      request.requestBody
    );
    schema.testPlans
      .findBy({
        id
      })
      .update({
        name,
        testSuites
      });
  }),

  // Test requests
  (thisRef) =>
  thisRef.get('Tests/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.tests.findBy({
      id
    }).attrs;
    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('Tests/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      name,
      selectedTestSuiteId,
      selectedTestProcedureId,
      selectedTestCaseId
    } = JSON.parse(
      request.requestBody
    );
    schema.tests
      .findBy({
        id
      })
      .update({
        name,
        selectedTestSuiteId,
        selectedTestProcedureId,
        selectedTestCaseId
      });
  }),

  (thisRef) =>
  thisRef.post('Tests', (schema) => {
    // , request)
    const newTestId = Math.floor(Math.random() * 10000);
    // const { testPlanId } = JSON.parse(request.requestBody);

    // schema.testPlans.findBy({ id: testPlanId }).update({
    //   testsIds: [
    //     ...testsIds,
    //      newTestId
    //   ]
    // });
    schema.tests.create({
      id: newTestId,
      name: '',
      creationDate: new Date().toISOString().split('T')[0],
      version: 'v.0.0',
      executionCounter: 0,
      testSuites: [{
        testSuiteId: 2,
        testSuite: 'register'
      }],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [],
      testProceduresCodes: [],
      selectedTestCaseId: {},
      selectedTestProcedureId: {}
    });
    return newTestId;
  }),

  // TestProcedure requests
  (thisRef) =>
  thisRef.get('TestProcedures/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.testProcedures.findBy({
      id
    }).attrs;
    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('TestProcedures/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      result
    } = JSON.parse(request.requestBody);
    schema.testProcedures.findBy({
      id
    }).update({
      result
    });
  }),

  (thisRef) =>
  thisRef.post('TestProcedures', (schema, request) => {
    const newProcedureId = Math.floor(Math.random() * 10000);
    const {
      testId
    } = JSON.parse(request.requestBody);
    const {
      testProceduresCodes
    } = schema.tests.findBy({
      id: testId
    }).attrs;
    schema.tests.findBy({
      id: testId
    }).update({
      testProceduresCodes: [
        ...testProceduresCodes,
        {
          testProcedureId: newProcedureId,
          testProcedureCode: `TP#${newProcedureId}`
        }
      ]
    });
    schema.testProcedures.create({
      id: newProcedureId,
      testStepsIds: [],
      result: ''
    });
  }),

  // TestCase requests
  (thisRef) =>
  thisRef.get('TestCases/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.testCases.findBy({
      id
    }).attrs;
    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('TestCases/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      preconditions,
      entryDataObject
    } = JSON.parse(request.requestBody);
    schema.testCases.findBy({
      id
    }).update({
      preconditions,
      entryDataObject
    });
    console.log(schema.testCases.findBy({
      id
    }).attrs);
  }),

  (thisRef) =>
  thisRef.post('TestCases', (schema, request) => {
    const newCaseId = Math.floor(Math.random() * 10000);
    const {
      testId
    } = JSON.parse(request.requestBody);
    const {
      testCasesCodes
    } = schema.tests.findBy({
      id: testId
    }).attrs;
    console.log(testCasesCodes);
    schema.tests.findBy({
      id: testId
    }).update({
      testCasesCodes: [
        ...testCasesCodes,
        {
          testCaseId: newCaseId,
          testCaseCode: `TC#${newCaseId}`
        }
      ]
    });
    schema.testCases.create({
      id: newCaseId,
      preconditions: '',
      entryDataObject: {}
    });
  }),

  // TestStep requests
  (thisRef) =>
  thisRef.get('Steps/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const findingItem = schema.testSteps.findBy({
      id
    }).attrs;
    return findingItem;
  }),

  (thisRef) =>
  thisRef.put('Steps/:id', (schema, request) => {
    const {
      id
    } = request.params;
    const {
      name,
      testDataObject,
      controlPoint
    } = JSON.parse(request.requestBody);
    schema.testSteps.findBy({
      id
    }).update({
      name,
      testDataObject,
      controlPoint
    });
  }),

  (thisRef) =>
  thisRef.post('Steps', (schema, request) => {
    const {
      name,
      testProcedureId: id
    } = JSON.parse(request.requestBody);
    const newStepId = Math.floor(Math.random() * 10000);
    const {
      testStepsIds
    } = schema.testProcedures.findBy({
      id
    }).attrs;
    schema.testProcedures.findBy({
      id
    }).update({
      testStepsIds: [...testStepsIds, newStepId]
    });
    schema.testSteps.create({
      id: newStepId,
      name,
      stepNumber: 5,
      testDataObject: {},
      controlPoint: ''
    });
  })
];

const seeds = [
  (serverRef) => [{
      id: 'ts1',
      name: 'Login TS1',
      stepNumber: 0,
      testDataObject: {
        Data0: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data1: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      },
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts2',
      name: 'Register TS2',
      stepNumber: 3,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts3',
      name: 'API TS3',
      stepNumber: 10,
      testDataObject: [{
        tableName: 'Table 1',
        RowName1: '',
        Data1: ['c', '1', '2', 'b', '3', 'c'],
        RowName2: 'Ble ble',
        Data2: ['x', 'y', 'z', 't', 'r', 'w'],
        RowName3: 'Tse Tse',
        Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
      }],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts4',
      name: 'Check username TS4',
      stepNumber: 20,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        },
        {
          tableName: 'Table 4',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts5',
      name: 'Login TS5',
      stepNumber: 0,
      testDataObject: {
        Data0: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data1: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      },
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts6',
      name: 'Register TS6',
      stepNumber: 3,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts7',
      name: 'API TS7',
      stepNumber: 10,
      testDataObject: [{
        tableName: 'Table 1',
        RowName1: '',
        Data1: ['c', '1', '2', 'b', '3', 'c'],
        RowName2: 'Ble ble',
        Data2: ['x', 'y', 'z', 't', 'r', 'w'],
        RowName3: 'Tse Tse',
        Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
      }],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts8',
      name: 'Check username TS8',
      stepNumber: 20,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        },
        {
          tableName: 'Table 4',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts9',
      name: 'Login TS9',
      stepNumber: 0,
      testDataObject: {
        Data0: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data1: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      },
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts10',
      name: 'Register TS10',
      stepNumber: 3,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts11',
      name: 'API TS11',
      stepNumber: 10,
      testDataObject: [{
        tableName: 'Table 1',
        RowName1: '',
        Data1: ['c', '1', '2', 'b', '3', 'c'],
        RowName2: 'Ble ble',
        Data2: ['x', 'y', 'z', 't', 'r', 'w'],
        RowName3: 'Tse Tse',
        Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
      }],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'ts12',
      name: 'Check username TS12',
      stepNumber: 20,
      testDataObject: [{
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        {
          tableName: 'Table 3',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        },
        {
          tableName: 'Table 4',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p'],
          RowName3: 'Ble ble',
          Data3: ['x', 'y', 'z', 't', 'r', 'w']
        }
      ],
      controlPoint: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    }
  ].forEach((testStep) => {
    serverRef.create('testStep', testStep);
  }),
  (serverRef) => [{
      id: 'tp1',
      testStepsIds: ['ts1', 'ts2'],
      result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'tp2',
      testStepsIds: ['ts3', 'ts4', 'ts5', 'ts6'],
      result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'tp3',
      testStepsIds: ['ts7'],
      result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    },
    {
      id: 'tp4',
      testStepsIds: ['ts8', 'ts9', 'ts10'],
      result: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisci nemo ut eveniet itaque assumenda consequatur quaerat sint, temporibus inventore totam.In, et dolor provident est quaerat blanditiis amet pariatur doloremque,
        saepe ut illo quo natus aut aspernatur non laboriosam possimus quidem sapiente voluptatum eius voluptas! Pariatur sed necessitatibus omnis dicta ullam itaque amet, placeat facere quibusdam laboriosam nemo!`
    }
  ].forEach((testProcedure) => {
    serverRef.create('testProcedure', testProcedure);
  }),

  (serverRef) => [{
      id: 'tc1',
      preconditions: `gggggggggggggggggggggLorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium `,
      entryDataObject: {
        Data0: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data1: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      }
    },
    {
      id: 'tc2',
      preconditions: 'cccccccccccccccccc, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium ',
      entryDataObject: {
        Data0: 'bbbbbbbbbbbbbbbbbbbbc',
        Data1: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['a', '2', '4', '6', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        }
      }
    },
    {
      id: 'tc3',
      preconditions: 'Ala ma kota',
      entryDataObject: {
        Data0: 'aaaaaaaaaaa',
        Data1: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        }
      }
    },
    {
      id: 'tc4',
      preconditions: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta cum molestiae omnis quidem? Pariatur vel labore quas corrupti quae voluptatibus earum, 
        deleniti fugiat iusto, laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium `,
      entryDataObject: {
        Data0: `laborum dolor unde error veniam esse alias animi nulla aliquid voluptas? Reprehenderit, dolore ratione delectus suscipit praesentium omnis tenetur eligendi laudantium 
        minus vel deleniti doloremque adipisc`,
        Data1: {
          tableName: 'Table 1',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Ble ble',
          Data2: ['x', 'y', 'z', 't', 'r', 'w'],
          RowName3: 'Tse Tse',
          Data3: ['a', 'b', 'c', 'd', 'ro', 'p']
        },
        Data2: {
          tableName: 'Table 2',
          RowName1: '',
          Data1: ['c', '1', '2', 'b', '3', 'c'],
          RowName2: 'Tse Tse',
          Data2: ['a', 'b', 'c', 'd', 'ro', 'p']
        }
      }
    }
  ].forEach((testCase) => {
    serverRef.create('testCase', testCase);
  }),
  (serverRef) => [{
      id: 't1',
      name: 'Test the best',
      creationDate: '21.10.2021',
      version: 'v.0.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        },
        {
          testSuiteId: 3,
          testSuite: 'API'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    },
    {
      id: 't2',
      name: 'Test 2',
      creationDate: '23.10.2021',
      version: 'v.1.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    },
    {
      id: 't3',
      name: 'Test 3',
      creationDate: '21.10.2021',
      version: 'v.0.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        },
        {
          testSuiteId: 3,
          testSuite: 'API'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    },
    {
      id: 't4',
      name: 'Test 4',
      creationDate: '21.10.2021',
      version: 'v.0.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        },
        {
          testSuiteId: 3,
          testSuite: 'API'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    },
    {
      id: 't5',
      name: 'Test 5',
      creationDate: '21.10.2021',
      version: 'v.0.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        },
        {
          testSuiteId: 3,
          testSuite: 'API'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    },
    {
      id: 't6',
      name: 'Test 6',
      creationDate: '21.10.2021',
      version: 'v.0.1',
      executionCounter: 0,
      testSuites: [{
          testSuiteId: 1,
          testSuite: 'login'
        },
        {
          testSuiteId: 2,
          testSuite: 'register'
        },
        {
          testSuiteId: 3,
          testSuite: 'API'
        }
      ],
      selectedTestSuiteId: {
        testSuiteId: 2,
        testSuite: 'register'
      },
      testCasesCodes: [{
          testCaseId: 'tc1',
          testCaseCode: 'TC#132'
        },
        {
          testCaseId: 'tc2',
          testCaseCode: 'TC#456'
        },
        {
          testCaseId: 'tc3',
          testCaseCode: 'TC#789'
        }
      ],
      testProceduresCodes: [{
          testProcedureId: 'tp1',
          testProcedureCode: 'TP#132'
        },
        {
          testProcedureId: 'tp2',
          testProcedureCode: 'TP#456'
        },
        {
          testProcedureId: 'tp3',
          testProcedureCode: 'TP#789'
        },
        {
          testProcedureId: 'tp4',
          testProcedureCode: 'TP#1-123'
        }
      ],
      selectedTestCaseId: {
        testCaseId: 'tc2',
        testCaseCode: 'TC#456'
      },
      selectedTestProcedureId: {
        testProcedureId: 'tp3',
        testProcedureCode: 'TP#789'
      }
    }
  ].forEach((test) => {
    serverRef.create('test', test);
  }),
  (serverRef) => [{
    id: 'tplan1',
    name: 'Test Plan 1',
    testSuites: [{
        testSuiteId: 1,
        testSuite: 'login'
      },
      {
        testSuiteId: 2,
        testSuite: 'register'
      },
      {
        testSuiteId: 3,
        testSuite: 'API'
      }
    ],
    testsIds: ['t1', 't2', 't3']
  }].forEach((testPlan) => {
    serverRef.create('testPlan', testPlan);
  })
];

export default {
  models,
  routes,
  seeds
};