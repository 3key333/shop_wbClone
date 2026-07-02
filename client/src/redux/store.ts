import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice.ts'
import marketReducer from './slice/marketSlice.ts'


export const store = configureStore({
    reducer: {
        user: userReducer,
        market: marketReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch