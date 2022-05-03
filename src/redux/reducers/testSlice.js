import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import bugService from '../../services/bugs';

import testService from '../../services/tests';

const successMessages = {
  executeTest: 'Test executed successfully',
  evaluateBug: 'Bug evaluated successfully'
};

const initialState = {
  testPlans: [],
  testPlan: {},
  test: {},
  loadingTestPlans: true,
  loadingTestPlan: true,
  loadingTest: true
};

//* ****** GET REQUESTS ****** *//

export const getTestPlans = createAsyncThunk('test/plans/get/all', async () => {
  const testPlans = await testService.getTestPlans();
  return testPlans;
});

export const getTestPlan = createAsyncThunk('test/plans/get', async ({ id }) => {
  const testPlan = await testService.getTestPlan({ id });
  return testPlan;
});

export const getTest = createAsyncThunk('test/get', async ({ testId, bugId }) => {
  let test;
  if (testId) {
    test = await testService.getTest({ id: testId });
  } else {
    test = await testService.getTestRelatedToBug({ bugId });
  }
  return test;
});

//* ****** PUT REQUESTS ****** *//

export const executeTest = createAsyncThunk('test/execute', async ({ id }) => {
  const data = await testService.executeTest({ id });
  return data;
});

export const evaluateBug = createAsyncThunk('bugs/evaluate', async ({ bugId, result }) => {
  const bug = await bugService.evaluateBug({ bugId, result });
  return bug;
});

export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTestPlans.pending, (state) => {
        state.loadingTestPlans = true;
      })
      .addCase(getTestPlans.fulfilled, (state, action) => {
        state.loadingTestPlans = false;
        state.testPlans = action.payload;
      })
      .addCase(getTestPlans.rejected, (state, action) => {
        state.loadingTestPlans = false;
        toast.error(action.error.message);
      })

      .addCase(getTestPlan.pending, (state) => {
        state.loadingTestPlan = true;
      })
      .addCase(getTestPlan.fulfilled, (state, action) => {
        state.loadingTestPlan = false;
        state.testPlan = action.payload;
      })
      .addCase(getTestPlan.rejected, (state, action) => {
        state.loadingTestPlan = false;
        toast.error(action.error.message);
      })

      .addCase(getTest.pending, (state) => {
        state.loadingTest = true;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.loadingTest = false;
        state.test = action.payload;
      })
      .addCase(getTest.rejected, (state, action) => {
        state.loadingTest = false;
        toast.error(action.error.message);
      })

      .addCase(executeTest.fulfilled, () => {
        toast.success(successMessages.executeTest);
      })
      .addCase(executeTest.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(evaluateBug.fulfilled, (state, action) => {
        state.test.steps.forEach((step) => {
          const bug = step.bugs.find((bug) => bug.id === action.payload.id);
          if (bug) {
            bug.evaluatedBy = action.payload.evaluatedBy;
          }
        });
        toast.success(successMessages.evaluateBug);
      })
      .addCase(evaluateBug.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export default testsSlice.reducer;
