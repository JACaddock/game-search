import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
    },
    reducers: {
        authenticate: (state, action) => {
                state.token = action.payload;
        },
    },
});

export const { authenticate } = authSlice.actions;

export const accessToken = (state) => state.auth.token;

export default authSlice.reducer;