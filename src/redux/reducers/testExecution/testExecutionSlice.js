import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import hash from 'object-hash';
import { toast } from 'react-toastify';

import server from '../../../services/server';

const initialState = {
  test: null,
  loading: true,
  pendingTestId: null,
  pendingErrorId: null
};

const prepareDataForView = (test) => ({
  ...test,
  testCaseEntryData: Array.isArray(test.testCaseEntryData)
    ? test.testCaseEntryData.map((dataItem, index) =>
        typeof dataItem === 'object'
          ? { ...dataItem, code: `Entry Data ${index + 1}` }
          : { name: dataItem, code: `Entry Data ${index + 1}` }
      )
    : [],
  steps: test.steps.map((step) => ({
    ...step,
    testData: Array.isArray(step.testData)
      ? step.testData.map((tableData) => ({
          ...tableData,
          code: `TD-${hash(tableData).slice(0, 8).toUpperCase()}`
        }))
      : []
  }))
});

export const getExecutionTestFromErrorId = createAsyncThunk(
  'testExecution/get/fromError',
  async ({ errorId }) => {
    const data = await server().get({ url: `Errors/ErrorTest/${errorId}` });

    const testWithExecutedInfo = {
      ...data,
      steps: await Promise.all(
        data.steps.map(async (step) => ({
          ...step,
          errors: await Promise.all(
            step.errorIds.map(async (errorId) => {
              const data = await server().get({ url: `Errors/${errorId}/executed` });
              return {
                executed: data,
                id: errorId,
                code: `B-${errorId.slice(0, 8).toUpperCase()}`
              };
            })
          )
        }))
      )
    };

    return prepareDataForView(testWithExecutedInfo);
  }
);

export const getExecutionTest = createAsyncThunk('testExecution/get', async ({ testId }) => {
  const data = await server().get({ url: `Tests/testExecution/${testId}` });
  const testWithExecutedInfo = {
    ...data,
    steps: await Promise.all(
      data.steps.map(async (step) => ({
        ...step,
        errors: await Promise.all(
          step.errorIds.map(async (errorId) => {
            const data = await server().get({ url: `Errors/${errorId}/executed` });
            return {
              executed: data,
              id: errorId,
              code: `B-${errorId.slice(0, 8).toUpperCase()}`
            };
          })
        )
      }))
    )
  };

  return prepareDataForView(testWithExecutedInfo);
});

export const executeTest = createAsyncThunk('testExecution/execute', async ({ testId }) => {
  const data = await server().put({ url: `Tests/${testId}/execute` });
  return data;
});

export const evaluateBug = createAsyncThunk('bugs/evaluate', async ({ errorId, result }) => {
  await server().post({ url: `Reviews/${errorId}`, data: { result } });
  return errorId;
});

export const testExecutionSlice = createSlice({
  name: 'testExecution',
  initialState,
  reducers: {
    setExecutionTestId: (state, action) => {
      state.pendingTestId = action.payload;
      state.pendingErrorId = null;
    },
    setExecutionBugId: (state, action) => {
      state.pendingErrorId = action.payload;
      state.pendingTestId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExecutionTestFromErrorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExecutionTestFromErrorId.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      })
      .addCase(getExecutionTestFromErrorId.rejected, (state, action) => {
        state.loading = false;
        state.test = null;
        toast.error(action.error.message);
      })

      .addCase(getExecutionTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExecutionTest.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      })
      .addCase(getExecutionTest.rejected, (state, action) => {
        state.loading = false;
        state.test = null;
        toast.error(action.error.message);
      })

      .addCase(executeTest.fulfilled, () => {
        toast.success('Test executed successfully');
      })
      .addCase(executeTest.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(evaluateBug.fulfilled, (state, action) => {
        state.test.steps = state.test.steps.map((step) => ({
          ...step,
          errors: step.errors.map((error) =>
            error.id === action.payload ? { ...error, executed: true } : error
          )
        }));
        toast.success('Test evaluated successfully');
      })
      .addCase(evaluateBug.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export const { setExecutionTestId, setExecutionBugId } = testExecutionSlice.actions;

export default testExecutionSlice.reducer;
