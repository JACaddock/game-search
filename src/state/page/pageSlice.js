import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: -1,
    },
    reducers: {
        clickPage: (state, action) => {
            state.value = action.payload;
        },
        backPage: (state) => {
            state.value = -1;
        },
    },
})

export const { clickPage, backPage } = pageSlice.actions;

export const selectPage = (state) => state.page.value;

export default pageSlice.reducer;