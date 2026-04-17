import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../actions/authAction';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    updateTokens: (state, action) => {
      state.accessToken = action?.payload?.accessToken;
      state.refreshToken = action?.payload?.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action?.payload?.accessToken;
        state.refreshToken = action?.payload?.refreshToken;
        state.user = action?.payload?.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed. Please check your credentials.';
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError, updateTokens } = authSlice.actions;
export const authReducer = authSlice.reducer;
