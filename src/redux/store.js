import { configureStore } from "@reduxjs/toolkit";
import contentSlice from './reducers/content';

export const store = configureStore({
    reducer: {
        content: contentSlice,
    },
});
