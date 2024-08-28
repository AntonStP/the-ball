import {createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: "content",
    initialState: {
        page: "authorization",
        data: 11
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const {
    setPage,
    setData
} = contentSlice.actions;
export default contentSlice.reducer;
