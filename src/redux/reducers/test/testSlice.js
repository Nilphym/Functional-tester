import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import server from '../../../services/server';

const transformTestData = (testDataObject) => {
  return testDataObject.data;
};

const transformEntryData = (entryDataObject) => {
  const dataArray = entryDataObject.data;
  const array = [];
  let iterator = 0;
  dataArray.forEach((element) => {
    if (typeof element === 'string') {
      array.push({
        textFieldId: `${iterator}`,
        entryType: 'textField',
        textField: element
      });
      iterator += 1;
    } else {
      array.push(element);
    }
  });

  return array;
};

const prepareOutputTestData = (testDataArray) => {
  const testDataObject = {};
  testDataObject.data = testDataArray;
  return testDataObject;
};

const prepareOutputEntryData = (entryDataArray) => {
  const entryDataObject = {};
  const dataArray = [];
  entryDataArray.forEach((object) => {
    if (object.entryType === 'textField') dataArray.push(object.textField);
    else {
      dataArray.push(object);
    }
  });
  entryDataObject.data = dataArray;
  return entryDataObject;
};

const initialState = {
  testId: '',
  testData: {},
  testSuites: [],
  testCasesCodes: [],
  testProceduresCodes: [],
  selectedTestSuiteId: '',
  selectedTestCaseId: '',
  selectedTestProcedureId: '',
  selectedTestCase: {},
  selectedTestProcedure: {},
  isLoadingTest: true,
  isLoadingTestProcedure: true,
  isLoadingTestCase: true,
  selectedTestStep: {},
  isLoadingTestStep: {},
  error: ''
};

// ----------------------------------------- Test API
export const getTestById = createAsyncThunk('test/get/byId', async (_, { getState }) => {
  const id = getState().test.testId ? getState().test.testId : localStorage.getItem('testId');
  const response = await server().get({
    url: `Tests/${id}`
  });
  return response;
});

export const putTestById = createAsyncThunk('test/put/ById', async (_, { getState }) => {
  const body = {
    name: getState().test.testData.testName,
    testSuiteId: getState().test.selectedTestSuiteId,
    testCaseId: getState().test.selectedTestCaseId,
    testProcedureId: getState().test.selectedTestProcedureId
  };

  const response = await server().put({
    url: `Tests/${getState().test.testId}`,
    data: body
  });
  return response;
});

export const postTest = createAsyncThunk(
  'test/post',
  async ({ testPlanId, testSuiteId, testName }) => {
    const response = await server().post({
      url: 'Tests',
      data: {
        planTestId: testPlanId,
        planSuiteId: testSuiteId,
        name: testName
      }
    });
    return response;
  }
);

// ----------------------------------------- Test Procedure API
export const getTestProcedureById = createAsyncThunk(
  'test/getTestProcedureById',
  async (_, { getState }) => {
    const response = await server().get({
      url: `TestProcedures/${getState().test.selectedTestProcedureId}`
    });
    return response;
  }
);

export const putTestProcedureById = createAsyncThunk(
  'test/putTestProcedureById',
  async (_, { getState }) => {
    const response = await server().put({
      url: `TestProcedures/${getState().test.selectedTestProcedureId}`,
      data: {
        testId: getState().test.testId,
        result: getState().test.selectedTestProcedure.result
      }
    });
    return response;
  }
);

export const postTestProcedure = createAsyncThunk(
  'test/postTestProcedure',
  async (_, { getState }) => {
    const response = await server().post({
      url: 'TestProcedures',
      data: {
        testCaseId: getState().test.selectedTestCaseId,
        result: 'No final result'
      }
    });
    return response;
  }
);

// ----------------------------------------- Test Case API
export const getTestCaseById = createAsyncThunk('test/getTestCaseById', async (_, { getState }) => {
  const response = await server().get({
    url: `TestCases/${getState().test.selectedTestCaseId}`
  });
  return response;
});

export const putTestCaseById = createAsyncThunk('test/putTestCaseById', async (_, { getState }) => {
  const transferObject = {
    testId: getState().test.testId,
    preconditions: getState().test.selectedTestCase.preconditions,
    entryDataObject: prepareOutputEntryData(getState().test.selectedTestCase.entryData)
  };

  const response = await server().put({
    url: `TestCases/${getState().test.selectedTestCaseId}`,
    data: transferObject
  });
  return response;
});

export const postTestCase = createAsyncThunk(
  'test/postTestCase',
  async (productId, { getState }) => {
    const response = await server().post({
      url: 'TestCases',
      data: {
        productId,
        testId: getState().test.testId
      }
    });
    return response;
  }
);

// ----------------------------------------- Test Step API
export const getTestStepById = createAsyncThunk('test/getTestStepById', async (testStepId) => {
  const response = await server().get({
    url: `Steps/${testStepId}`
  });
  return response;
});

export const putTestStepById = createAsyncThunk(
  'test/putTestStepById',
  async (testStepId, { getState }) => {
    const currentTestStep = getState().test.selectedTestStep[testStepId];
    const dataToSend = {};
    dataToSend.name = currentTestStep.name;
    dataToSend.testDataObject = prepareOutputTestData(currentTestStep.testData);
    dataToSend.controlPoint = currentTestStep.controlPoint;
    const response = await server().put({
      url: `Steps/${testStepId}`,
      data: dataToSend
    });
    return response;
  }
);

export const postTestStep = createAsyncThunk(
  'test/postTestStep',
  async (newStepName, { getState }) => {
    const currentTestProcedureId = getState().test.selectedTestProcedure.id;
    const dataToSend = {};
    dataToSend.testProcedureId = currentTestProcedureId;
    dataToSend.name = newStepName;
    const { selectedTestStep } = getState().test;
    const stepsKeys = Object.keys(selectedTestStep);
    const newStepNumber =
      Object.keys(selectedTestStep).length > 0
        ? selectedTestStep[stepsKeys[stepsKeys.length - 1]].stepNumber + 1
        : 1;
    dataToSend.stepNumber = newStepNumber;
    const response = await server().post({
      url: 'Steps',
      data: dataToSend
    });
    return response;
  }
);

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestId: (state, action) => {
      state.testId = action.payload;
      state.isLoading = true;
    },
    addTestStepTestData: (state, action) => {
      const { id, newTable } = action.payload;
      state.selectedTestStep[id].testData = state.selectedTestStep[id].testData
        ? [...state.selectedTestStep[id].testData, newTable]
        : [newTable];
    },
    editTestStepTestData: (state, action) => {
      const { id, editedTable } = action.payload;
      state.selectedTestStep[id].testData[
        state.selectedTestStep[id].testData.findIndex((table) => table.name === editedTable.name)
      ] = editedTable;
    },
    editTestStepControlPoint: (state, action) => {
      const { id, editedControlPoint } = action.payload;
      state.selectedTestStep[id].controlPoint = editedControlPoint;
    },
    deleteTestStepTestData: (state, action) => {
      const { id, name } = action.payload;
      state.selectedTestStep[id].testData = [
        ...state.selectedTestStep[id].testData.filter((table) => table.name !== name)
      ];
    },
    setTestStepName: (state, action) => {
      const { id, newName } = action.payload;
      state.selectedTestStep[id].name = newName;
    },
    setTestStepLoading: (state, action) => {
      const { id, value } = action.payload;
      state.isLoadingTestStep[id] = value;
    },
    editTestProcedureResult: (state, action) => {
      state.selectedTestProcedure.result = action.payload.result;
    },
    setTestProcedureLoading: (state, action) => {
      state.isLoadingTestProcedure = action.payload.isLoading;
    },
    addTestCaseEntryDataItem: (state, action) => {
      const { newItem } = action.payload;
      state.selectedTestCase.entryData = [...state.selectedTestCase.entryData, newItem];
    },
    editTestCaseTextField: (state, action) => {
      const { editedTextField } = action.payload;
      state.selectedTestCase.entryData[
        state.selectedTestCase.entryData.findIndex(
          (item) =>
            item.entryType === 'textField' && item.textFieldId === editedTextField.textFieldId
        )
      ] = editedTextField;
    },
    editTestCaseTable: (state, action) => {
      const { editedTable } = action.payload;
      state.selectedTestCase.entryData[
        state.selectedTestCase.entryData.findIndex((table) => table.name === editedTable.name)
      ] = editedTable;
    },
    editTestCasePreconditions: (state, action) => {
      const { editedPreconditions } = action.payload;
      state.selectedTestCase.preconditions = editedPreconditions;
    },
    deleteTestCaseTextField: (state, action) => {
      const { textFieldId } = action.payload;
      state.selectedTestCase.entryData = [
        ...state.selectedTestCase.entryData.filter((item) => item.textFieldId !== textFieldId)
      ];
    },
    deleteTestCaseTable: (state, action) => {
      const { name } = action.payload;
      state.selectedTestCase.entryData = [
        ...state.selectedTestCase.entryData.filter((item) => item.name !== name)
      ];
    },
    setTestCaseLoading: (state, action) => {
      state.isLoadingTestCase = action.payload.isLoading;
    },
    setTestTestCase: (state, action) => {
      state.selectedTestCaseId = action.payload.id;
    },
    setTestTestProcedure: (state, action) => {
      state.selectedTestProcedureId = action.payload.id;
      state.selectedTestProcedure.testStepsIds = [];
      state.selectedTestStep = {};
    },
    setTestName: (state, action) => {
      state.testData.testName = action.payload.newName;
    },
    setTestSuite: (state, action) => {
      state.selectedTestSuiteId = action.payload.newTestSuiteId;
    },
    setTestLoading: (state, action) => {
      state.isLoadingTest = action.payload.isLoading;
    },
    increaseExecutionCount: (state) => {
      state.testData.executionCounter += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestById.fulfilled, (state, action) => {
        const {
          id,
          name,
          creationDate,
          executionCounter,
          testSuites,
          testCases,
          testProcedures,
          testSuite,
          testCase,
          testProcedure
        } = action.payload;
        state.testId = id;
        state.testData.testName = name;
        state.testData.creationDate = creationDate;
        state.testData.executionCounter = executionCounter;
        state.testSuites = testSuites;
        state.testCasesCodes = testCases;
        state.testProceduresCodes = testProcedures;
        state.selectedTestSuiteId = testSuite ? testSuite.id : '';
        state.selectedTestCaseId = testCase ? testCase.id : '';
        state.selectedTestProcedureId = testProcedure ? testProcedure.id : '';
        state.isLoadingTest = false;
        state.error = '';
      })
      .addCase(getTestById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestById.fulfilled, () => {
      //   alert('Object changed');
      // })
      .addCase(putTestById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(postTest.fulfilled, (_, action) => {
        return action.payload.testPlanId;
      })
      .addCase(postTest.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTestProcedureById.fulfilled, (state, action) => {
        const { id, result, testCaseId, stepIds: testStepsIds } = action.payload;
        state.selectedTestProcedure.id = id;
        state.selectedTestProcedure.testStepsIds = testStepsIds;
        state.selectedTestProcedure.result = result;
        state.selectedTestProcedure.testCaseId = testCaseId;
        state.isLoadingTestProcedure = false;
        state.isLoadingTestStep = {};
        state.selectedTestStep = {};
        testStepsIds.forEach((testStepId) => {
          state.isLoadingTestStep[testStepId] = true;
          state.selectedTestStep[testStepId] = {};
        });
      })
      .addCase(getTestProcedureById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestProcedureById.fulfilled, () => {
      //   alert('Object changed');
      // })
      .addCase(putTestProcedureById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(postTestProcedure.fulfilled, () => {
      //   alert('Object added');
      // })
      .addCase(postTestProcedure.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTestCaseById.fulfilled, (state, action) => {
        state.selectedTestCase.entryData =
          typeof action.payload.entryDataObject === 'object' &&
          Object.keys(action.payload.entryDataObject).length > 0
            ? transformEntryData(action.payload.entryDataObject)
            : [];
        state.selectedTestCase.preconditions = action.payload.preconditions;
        state.isLoadingTestCase = false;
      })
      .addCase(getTestCaseById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestCaseById.fulfilled, () => {
      //   alert('Object changed');
      // })
      .addCase(putTestCaseById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(postTestCase.fulfilled, () => {
      //   alert('Object changed');
      // })
      .addCase(postTestCase.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTestStepById.fulfilled, (state, action) => {
        const { id, name, stepNumber, testDataObject, controlPoint } = action.payload;
        state.selectedTestStep[id] = {};
        state.selectedTestStep[id].id = id;
        state.selectedTestStep[id].name = name;
        state.selectedTestStep[id].stepNumber = stepNumber;
        state.selectedTestStep[id].testData = transformTestData(testDataObject);
        state.selectedTestStep[id].controlPoint = controlPoint;
        state.isLoadingTestStep[id] = false;
      })
      .addCase(getTestStepById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestStepById.fulfilled, () => {
      //   console.log('Object changed');
      // })
      .addCase(putTestStepById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(postTestStep.fulfilled, () => {
      //   console.log('Object changed, Object added');
      // })
      .addCase(postTestStep.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const {
  setTestId,
  addTestStepTestData,
  editTestStepTestData,
  editTestStepControlPoint,
  deleteTestStepTestData,
  setTestStepLoading,
  setTestStepName,
  editTestProcedureResult,
  setTestProcedureLoading,
  addTestCaseEntryDataItem,
  editTestCaseTextField,
  editTestCaseTable,
  editTestCasePreconditions,
  deleteTestCaseTextField,
  deleteTestCaseTable,
  setTestCaseLoading,
  setTestTestCase,
  setTestTestProcedure,
  setTestName,
  setTestSuite,
  setTestLoading,
  increaseExecutionCount
} = testSlice.actions;
export default testSlice.reducer;
