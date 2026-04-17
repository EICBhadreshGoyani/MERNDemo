import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUser, updateUser, deleteUser } from '../actions/usersAction';
import { MOCK_USERS, SLICE_NAME } from '../../utils/constants';

const initialState = {
    users: null,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: SLICE_NAME.USERS,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action?.payload?.users || MOCK_USERS;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.unshift(action?.payload?.user);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(item => item._id === action?.payload?.user?._id);
                if (index !== -1) {
                    state.users[index] = action?.payload?.user;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(item => item._id === action?.payload?.user?._id);
                if (index !== -1) {
                    state.users.splice(index, 1);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const usersAction = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
