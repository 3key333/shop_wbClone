import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const getUserInfo = createAsyncThunk(
    'market/get_user_info',
    async (_, { rejectWithValue } ) => {
        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/user/me`, 
                {withCredentials: true}
            )

            console.log(data)

            return data
            
        } catch (error) {
            return rejectWithValue('ошибка при запросе данных о пользователе')
        }
    }
)