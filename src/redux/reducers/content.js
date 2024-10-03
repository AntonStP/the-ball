import {createSlice} from "@reduxjs/toolkit";
import RequestsBuilder from "@/utils/redux/RequestsBuilder";
import {getData} from "@/api/main";

const builder = new RequestsBuilder({
    name: "content",
    initialState: {
        page: "authorization",
        data: null,
        dataOriginal: null,
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
            const data = state.data;
            if (data === null) return;
            const index = selectIndex(state.data);

            state.data = [...data.slice(0, index), ...data.slice(index + 1, data.length)];
            state.currentTitle = data[index].title;

            if (state.data?.length === 0) {
                state.data = state.dataOriginal;
            }
        }

    }
}).addExtraReducer({
    ["requests/form/submit/fulfilled"]: (state, action) => {
        try {
            window.localStorage.setItem('user', JSON. stringify(action?.payload));
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.error("Error parsing JSON data from localStorage. Data might be corrupted.", error);
            } else if (error instanceof TypeError) {
                console.error("localStorage is not supported in this environment.", error);
            } else {
                console.error("An unknown error occurred while reading from localStorage:", error);
            }
            return null;
        }
        state.page = 'game';
    }
}).createExtraReducer({
    thunkName: 'content/getData',
    thunkExtraName: 'getData',
    saveData(state, {payload}) {
        state.data = payload;
        state.dataOriginal = payload;
    },
    func: getData
});


const selectIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

builder.create();

const content = builder.export();

export const {
    setPage,
    setData,
    setUser,
    setCurrentTitle
} = content.actions;
export const {useContent} = content.selectors
export default content;
