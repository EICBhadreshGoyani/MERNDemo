import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Login user with email and password.
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/login', {
        email: payload?.email,
        password: payload?.password
      });
      return response; // { user details }
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password';
      return rejectWithValue(message);
    }
  }
);

// Logout user clears auth state and removes persisted session
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  return null;
});
