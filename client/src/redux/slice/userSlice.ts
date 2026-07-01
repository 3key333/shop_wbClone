import { createSlice } from "@reduxjs/toolkit"; 
import { getUserInfo } from "../thunk/userInfo.ts";

interface UserSliceState {
    id: string,
    name: string,
    role: string,
    products: [],
}

const initialState: UserSliceState = {
    id: '',
    name: '',
    role: '',
    products: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.id = action.payload.data.id
                state.name = action.payload.data.name
                state.role = action.payload.data.role
            })

    }
})


export default userSlice.reducer
