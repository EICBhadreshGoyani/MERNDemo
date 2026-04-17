import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('users');
            return response; // { users list }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch users';
            return rejectWithValue(message);
        }
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/createUser', {
                firstName: payload?.firstName,
                lastName: payload?.lastName,
                email: payload?.email,
                role: payload?.role,
            });
            return response; // { Added user }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create user';
            return rejectWithValue(message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`users/${payload?._id}`, {
                firstName: payload?.firstName,
                lastName: payload?.lastName,
                email: payload?.email,
                role: payload?.role,
            });
            return response; // { updated user }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update user';
            return rejectWithValue(message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`users/${payload?._id}`);
            return response; // { delete user }
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete user';
            return rejectWithValue(message);
        }
    }
);