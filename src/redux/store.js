import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/authSlice';
import testReducer from './reducers/test/testSlice';
import bugsReducer from './reducers/bugs/bugsSlice';
import testPlanReducer from './reducers/testPlan/testPlanSlice';
import testExecutionReducer from './reducers/testExecution/testExecutionSlice';
import raportsReducer from './reducers/raports/raportsSlice';

const reducer = {
  auth: authReducer,
  test: testReducer,
  bugs: bugsReducer,
  testPlan: testPlanReducer,
  testExecution: testExecutionReducer,
  raports: raportsReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
export * from './reducers/auth/authSlice';
export * from './reducers/test/testSlice';
export * from './reducers/bugs/bugsSlice';
export * from './reducers/testPlan/testPlanSlice';
export * from './reducers/testExecution/testExecutionSlice';
export * from './reducers/raports/raportsSlice';
