import { configureStore } from "@reduxjs/toolkit";
import requests from "@/redux/reducers/requests";
import content from "@/redux/reducers/content";

export const store = configureStore({
    reducer: {
        [requests.name]: requests.reducer,
        [content.name]: content.reducer,
    },
});
