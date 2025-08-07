import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./notesSlice.js"

export const store = configureStore ({
    reducer: {
        notes : nodeReducer,
    },
}) 