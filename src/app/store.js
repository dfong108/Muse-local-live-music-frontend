import { configureStore } from "@reduxjs/toolkit";
import bandsReducer from '../features/bands/bandsSlice';

export const store = configureStore({
    reducer: {
        bands: bandsReducer,
    }
})
