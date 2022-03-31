import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../../../services/auth';
import server from '../../../services/server';

// ----------------------------------------- Users API
export const getUsers = createAsyncThunk('users/get', async () => {
  const response = await server().get({
    url: 'Products/users'
  });
  return response;
});

export const deleteUser = createAsyncThunk('user/delete', async ({ userName }) => {
  const response = await server().put({
    url: 'Account/deleteUser',
    data: {
      userName
    }
  });
  return response;
});

// ----------------------------------------- Product API
export const getProductById = createAsyncThunk('product/get/byId', async (_, { getState }) => {
  const response = await server().get({
    url: `Products/${getState().auth.token.productId}`
  });
  return response;
});

export const getProductTestPlansById = createAsyncThunk(
  'product/testPlans/get/byId',
  async (_, { getState }) => {
    const response = await server().get({
      url: `Product/${getState().auth.token.productId}/TestPlans`
    });
    return response;
  }
);

// ----------------------------------------- Test Plan API
export const postTestPlan = createAsyncThunk(
  'testPlan/post',
  async (testPlanName, { getState }) => {
    const response = await server().post({
      url: `${getState().auth.token.productId}/TestPlans`,
      data: {
        name: testPlanName
      }
    });
    return response;
  }
);

export const changeUserPassword = createAsyncThunk(
  'user/change/password/byId',
  async ({ password, repeatPassword, userId, token }) => {
    const response = await server().put({
      url: 'Account/resetPassword',
      data: {
        password,
        confirmedPassword: repeatPassword,
        userId,
        passwordResetToken: token
      }
    });
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forget/password',
  async ({ email, username }) => {
    const response = await server().post({
      url: 'Account/forgotPassword',
      data: {
        email,
        userName: username
      }
    });
    return response;
  }
);

export const inviteUser = createAsyncThunk(
  'user/invite/byPM',
  async ({ email, role }, { getState }) => {
    const response = await server().post({
      url: 'Account/invitation',
      data: {
        productId: getState().auth.token.productId,
        email,
        role
      }
    });
    return response;
  }
);

export const registerUserToProject = createAsyncThunk(
  'user/registerToProject',
  async ({ name, surname, password, role, productIdEncoded, emailEncoded }) => {
    const response = await server().post({
      url: 'Account/registration',
      data: {
        firstName: name,
        lastName: surname,
        password,
        role,
        emailEncoded,
        productIdEncoded
      }
    });
    return response;
  }
);

const token = authService.getDecodedToken();
const initialState = token
  ? {
      isLoggedIn: true,
      token,
      creationDate: '',
      version: '',
      testPlans: [],
      users: [],
      isLoading: true,
      isLoadingUsers: true,
      error: ''
    }
  : {
      isLoggedIn: false,
      token: null,
      creationDate: '',
      version: '',
      testPlans: [],
      users: [],
      isLoading: true,
      isLoadingUsers: true,
      error: ''
    };

export const register = createAsyncThunk(
  'auth/register',
  async ({ projectName, name, surname, email, password }) => {
    const response = await server().post({
      url: 'Products',
      data: {
        name: projectName,
        firstName: name,
        lastName: surname,
        email,
        password
      }
    });
    return response;
  }
);

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const data = await authService.login({
    email,
    password
  });
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.isLoggedIn = false;
      state.token = null;
    },
    setIsLoadingUsers: (state, action) => {
      state.isLoadingUsers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        const { id, name, creationDate, version } = action.payload;
        state.productId = id;
        state.productName = name;
        state.creationDate = creationDate;
        state.version = version;
        state.error = '';
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(getProductTestPlansById.fulfilled, (state, action) => {
        state.testPlans = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductTestPlansById.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(postTestPlan.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoadingUsers = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(registerUserToProject.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(inviteUser.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.alert = action.error.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.alert = action.error.message;
      });
  }
});

export const { logout, setIsLoadingUsers } = authSlice.actions;
export default authSlice.reducer;
