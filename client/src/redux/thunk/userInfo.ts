import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import type { IProductEntity } from "../../types.ts";


export const getUserInfo = createAsyncThunk(
    'market/get_user_info',
    async (_, { rejectWithValue } ) => {
        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/user/me`, 
                {withCredentials: true}
            )

            return data
            
        } catch (error) {
            return rejectWithValue('ошибка при запросе данных о пользователе')
        }
    }
)

export const getUserProducts = createAsyncThunk(
    'products/get_user_products',
    async ( id: string, { rejectWithValue } ) => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/user/${id}`,
                {withCredentials: true}
            )

            return data.data as IProductEntity[]
            
        } catch (error) {
            return rejectWithValue('Ошибка запроса продуктов клиента')
        }

    }
)