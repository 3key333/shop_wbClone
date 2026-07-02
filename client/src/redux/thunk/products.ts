import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import type { NewProductRequest } from "../../types.ts";


export const createProduct = createAsyncThunk(
    'products/create_new_product',
    async ( data: NewProductRequest, { rejectWithValue } ) => {

        try {

            const payload = await axios.post(
                `${import.meta.env.VITE_API_URL}/products/create_new_product`, 
                data, 
                {withCredentials: true}
            )

            return payload.data.data
            
        } catch (error) {
            return rejectWithValue('Ошибка при создании нового продукта')
        }

    }
)

export const getAllProducts = createAsyncThunk(
    'products/get_all_products',
    async (_, {rejectWithValue}) => {
        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/products`, 
                {withCredentials: true}
            )

            return data.data
            
        } catch (error) {
            return rejectWithValue('Ошибка загрузки товаров в магазин')
        }
    }
)