import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import server from '../../../services/server';

const initialState = {
  loading: true,
  data: {
    daysFromStart: undefined,
    testersNumber: undefined,
    devsNumber: undefined,
    testPlansNumber: undefined,
    testSuitesNumber: undefined,
    testsNumber: undefined,
    testSuitesByName: []
  }
};

const prepareDataForView = ({ chart, bugs }) => {
  const bugsByImpact = {};
  const bugsByPriority = {};

  bugs.forEach(({ errorImpact }) => {
    if (bugsByImpact[errorImpact]) {
      bugsByImpact[errorImpact]++;
    } else {
      bugsByImpact[errorImpact] = 1;
    }
  });

  bugs.forEach(({ errorPriority }) => {
    if (bugsByPriority[errorPriority]) {
      bugsByPriority[errorPriority]++;
    } else {
      bugsByPriority[errorPriority] = 1;
    }
  });

  return {
    ...chart,
    bugsAll: bugs.length,
    bugsFixed: bugs.filter(({ errorState }) => errorState === 'Closed').length,
    bugsRejected: bugs.filter(({ errorState }) => errorState === 'Rejected').length,
    bugsByImpact: Object.entries(bugsByImpact).map(([name, value]) => ({ name, value })),
    bugsByPriority: Object.entries(bugsByPriority).map(([name, value]) => ({ name, value })),
    testSuitesByName: chart.testSuitesByName.map(({ name, numberOfTest }) => ({
      name,
      value: numberOfTest
    }))
  };
};

export const getRaport = createAsyncThunk('raports/get', async (_, { getState }) => {
  const { productId } = getState().auth.token;

  const chart = await server().get({ url: 'Chart' });
  const bugs = await server().get({ url: `Project/${productId}/Errors` });

  return prepareDataForView({ chart, bugs });
});

export const raportsSlice = createSlice({
  name: 'raports',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRaport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRaport.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRaport.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export default raportsSlice.reducer;
