import {createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: "content",
    initialState: {
        data: 11
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const {setData} = contentSlice.actions;
export default contentSlice.reducer;
