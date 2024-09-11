import {createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name: "content",
    initialState: {
        page: "authorization",
        data: null,
        currentTitle: '',
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCurrentTitle: (state) => {
            //TODO: обновить массив, когда закончится
            const data = state.data;
            if(data === null) return;
            if(state.data?.length===1) {
                state.currentTitle = data[0].title;
                return;
            }

            const index = selectIndex(state.data);

            state.data = [...data.slice(0,index), ...data.slice(index+1, data.length)];
            state.currentTitle = data[index].title;
        }

    }
});


const selectIndex = (arr) => {
    return  Math.floor(Math.random() * arr.length);
}

export const {
    setPage,
    setData,
    setUser,
    setCurrentTitle
} = contentSlice.actions;
export default contentSlice.reducer;
