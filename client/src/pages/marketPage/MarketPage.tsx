import { useNavigate } from 'react-router-dom'
import style from './marketPage.module.scss'
import { useEffect } from 'react'
import { getUserInfo } from '../../redux/thunk/userInfo.ts'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store.ts'


export const MarketPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [navigate, dispatch])

    



    return(
        <>
        </>
    )
}