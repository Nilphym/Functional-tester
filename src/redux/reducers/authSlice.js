import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import authService from '../../services/auth';

const successMessages = {
  registerProject: 'Project registered successfully',
  inviteUser: 'User invited successfully',
  registerUser: 'User registered successfully',
  forgotPassword: 'Password reset link has been sent to your e-mail account',
  changeUserPassword: 'Password updated successfully',
  deleteUser: 'User deleted successfully'
};

const token = authService.getDecodedToken();
const initialState = {
  logged: !!token,
  token,
  users: [],
  loading: true
};

//* ****** GET REQUESTS ****** *//

export const getUsers = createAsyncThunk('auth/get/all', async () => {
  const users = await authService.getUsers();
  return users;
});

//* ****** POST REQUESTS ****** *//

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const user = await authService.login({
    email,
    password
  });
  return user;
});

export const registerProject = createAsyncThunk(
  'auth/registerProject',
  async ({ projectName, name, surname, email, password }) => {
    const { project, user } = await authService.registerProject({
      projectName,
      name,
      surname,
      email,
      password
    });
    return { project, user };
  }
);

export const inviteUser = createAsyncThunk('auth/invite', async ({ email, role }, { getState }) => {
  const user = authService.inviteUser({
    projectId: getState().auth.token.projectId,
    email,
    role
  });
  return user;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ projectId, name, surname, email, password, role }) => {
    const user = authService.registerUser({
      projectId,
      name,
      surname,
      email,
      password,
      role
    });
    return user;
  }
);

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (_, { getState }) => {
  const id = getState().auth.token.userId;
  await authService.forgotPassword({ id });
  return { id };
});

//* ****** PUT REQUESTS ****** *//

export const changeUserPassword = createAsyncThunk(
  'auth/put/password',
  async ({ password, resetToken }, { getState }) => {
    const id = getState().auth.token.userId;
    await authService.updatePassword({ id, password, resetToken });
    return { id };
  }
);

//* ****** DELETE REQUESTS ****** *//

export const deleteUser = createAsyncThunk('auth/delete', async ({ id }) => {
  await authService.deleteUser({ id });
  return { id };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.isLoggedIn = false;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.logged = true;
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.logged = false;
        state.token = null;
        state.loading = false;
        toast.error(action.error.message);
      })

      .addCase(registerProject.fulfilled, () => {
        toast.success(successMessages.registerProject);
      })
      .addCase(registerProject.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(inviteUser.fulfilled, () => {
        toast.success(successMessages.inviteUser);
      })
      .addCase(inviteUser.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(registerUser.fulfilled, () => {
        toast.success(successMessages.registerUser);
      })
      .addCase(registerUser.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(forgotPassword.fulfilled, () => {
        toast.success(successMessages.forgotPassword);
      })
      .addCase(forgotPassword.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(changeUserPassword.fulfilled, () => {
        toast.success(successMessages.changeUserPassword);
      })
      .addCase(changeUserPassword.rejected, (_, action) => {
        toast.error(action.error.message);
      })

      .addCase(deleteUser.fulfilled, () => {
        toast.success(successMessages.deleteUser);
      })
      .addCase(deleteUser.rejected, (_, action) => {
        toast.error(action.error.message);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
