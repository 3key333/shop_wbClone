import { createSlice } from "@reduxjs/toolkit"; 
import { getUserInfo, getUserProducts } from "../thunk/userInfo.ts";
import { createProduct } from "../thunk/products.ts";
import type { IProductEntity } from "../../types.ts";


interface UserSliceState {
    id: string;
    name: string;
    role: string;
    isLoading: boolean;
    products: IProductEntity[];
    error: string | null;
}

const initialState: UserSliceState = {
    id: '',
    name: '',
    role: '',
    isLoading: false,
    products: [],
    error: null,
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

            .addCase(getUserProducts.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getUserProducts.fulfilled, (state, action) => {
                state.products = action.payload ?? []
                state.isLoading = false
            })

            .addCase(getUserProducts.rejected, (state) => {
                state.error = 'ошибка загрузки'
                state.isLoading = false
                state.products = []
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })

    }
})


export default userSlice.reducer
