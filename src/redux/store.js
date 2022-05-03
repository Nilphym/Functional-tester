import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import bugsReducer from './reducers/bugsSlice';
import raportsReducer from './reducers/raportsSlice';
import testReducer from './reducers/testSlice';

const reducer = {
  auth: authReducer,
  bugs: bugsReducer,
  raports: raportsReducer,
  tests: testReducer
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
export * from './reducers/authSlice';
export * from './reducers/bugsSlice';
export * from './reducers/raportsSlice';
export * from './reducers/testSlice';
