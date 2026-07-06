import { createSlice } from "@reduxjs/toolkit";
import type { IProductEntity } from "../../types.ts";
import { getAllProducts } from "../thunk/products.ts";

export interface MarketState {
    isLoad: boolean;
    products: IProductEntity[];
}

const initialState: MarketState = {
    isLoad: false,
    products: [],
}


const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {

        addProduct: (state, action) => {
            state.products.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder

            .addCase(getAllProducts.pending, (state) => {
                state.isLoad = true
            })
            
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoad = false
                state.products = action.payload
            })

            .addCase(getAllProducts.rejected, (state) => {
                state.isLoad = true
                state.products = []
            })
    }
})

export default marketSlice.reducer
export const {
    addProduct
} = marketSlice.actions