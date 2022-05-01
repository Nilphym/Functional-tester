import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import raportService from '../../services/raports';

const initialState = {
  raport: {
    daysFromStart: 0,
    testers: 0,
    devs: 0,
    bugsByImpact: [],
    bugsByPriority: [],
    testSuites: 0,
    bugsRejected: 0,
    testSuitesByName: [],
    bugsFixed: 0
  },
  loading: true
};

export const getRaport = createAsyncThunk('raports/get', async () => {
  const raport = await raportService.getRaport();
  return raport;
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
        state.raport = action.payload;
        state.loading = false;
      })
      .addCase(getRaport.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  }
});

export default raportsSlice.reducer;
