import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import server from '../../../services/server';

const initialState = {
  selectedTestPlanId: '',
  selectedTestPlan: {},
  isLoadingTestSuites: {},
  isLoading: true,
  error: ''
};

// ----------------------------------------- Test Plan API
export const getTestPlanById = createAsyncThunk('testPlan/get/byId', async (_, {
  getState
}) => {
  const id = getState().testPlan.selectedTestPlanId ?
    getState().testPlan.selectedTestPlanId :
    localStorage.getItem('testPlanId');
  const response = await server().get({
    url: `TestPlans/${id}`
  });
  return response;
});

export const putTestPlanById = createAsyncThunk('testPlan/put/ById', async (_, {
  getState
}) => {
  const {
    selectedTestPlan
  } = getState().testPlan;

  const body = {
    name: selectedTestPlan.name
  };

  const response = await server().put({
    url: `TestPlans/${getState().testPlan.selectedTestPlanId}`,
    data: body
  });
  return response;
});

// ----------------------------------------- Test Suite API

export const getTestSuiteTests = createAsyncThunk('testSuite/test/get', async (testSuiteId) => {
  const response = await server().get({
    url: `TestSuites/${testSuiteId}/tests`
  });
  return response;
});

export const postTestSuite = createAsyncThunk(
  'testSuite/post',
  async (testSuiteName, {
    getState
  }) => {
    const {
      selectedTestPlanId
    } = getState().testPlan;

    const body = {
      testPlanId: selectedTestPlanId,
      category: testSuiteName
    };

    const response = await server().post({
      url: 'TestSuites',
      data: body
    });
    return response;
  }
);

export const putTestSuite = createAsyncThunk(
  'testSuite/put',
  async ({
    newTestSuiteName,
    testSuiteId
  }) => {
    const body = {
      category: newTestSuiteName
    };

    const response = await server().put({
      url: `TestSuites/${testSuiteId}`,
      data: body
    });
    return response;
  }
);

export const getTestExecCounter = createAsyncThunk('test/execCounter', async (testId) => {
  const response = await server().get({
    url: `Tests/${testId}/executionCounter`
  });
  return response;
});

export const testPlanSlice = createSlice({
  name: 'testPlans',
  initialState,
  reducers: {
    setTestPlanId: (state, action) => {
      state.selectedTestPlanId = action.payload.id;
    },
    editTestPlanName: (state, action) => {
      state.selectedTestPlan.name = action.payload.newTestName;
    },
    deleteTestSuite: (state, action) => {
      state.selectedTestPlan.testSuites = state.selectedTestPlan.testSuites.filter(
        (testSuite) => testSuite.testSuiteId !== action.payload.testSuiteId
      );
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestPlanById.fulfilled, (state, action) => {
        const {
          id,
          name,
          testSuites
        } = action.payload;
        if (!state.selectedTestPlanId)
          state.selectedTestPlanId = id;
        state.selectedTestPlan.id = id;
        state.selectedTestPlan.name = name;
        state.selectedTestPlan.testSuites = testSuites;
        state.selectedTestPlan.tests = {};
        state.selectedTestPlan.categories = {};
        state.isLoadingTestSuites = {};
        state.error = '';
        testSuites.forEach(({
          id
        }) => {
          state.isLoadingTestSuites[id] = true;
        });
        state.isLoading = false;
      })
      .addCase(getTestPlanById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestPlanById.fulfilled, () => {
      //   alert('Object changed');
      // })
      .addCase(getTestSuiteTests.fulfilled, (state, action) => {
        const {
          id: testSuiteId,
          category,
          testsForTestSuite
        } = action.payload;
        state.selectedTestPlan.tests[testSuiteId] = testsForTestSuite;
        state.selectedTestPlan.categories[testSuiteId] = category;
        state.isLoadingTestSuites[testSuiteId] = false;
      })
      .addCase(getTestSuiteTests.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(putTestPlanById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getTestExecCounter.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(postTestSuite.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // .addCase(putTestSuite.fulfilled, () => {
      //   alert('Test Suite modified');
      // })
      .addCase(putTestSuite.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const {
  setTestPlanId,
  editTestPlanName,
  deleteTestSuite,
  setLoading
} =
testPlanSlice.actions;
export default testPlanSlice.reducer;