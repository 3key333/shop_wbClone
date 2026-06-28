import { useEffect, useState } from 'react'
import style from './header.module.scss'
import type { IUserEntity } from '../../types'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Header = () => {

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState<IUserEntity>({
        name: '',
        role: null,
    })

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const data = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/me`,
                    { withCredentials: true }// разрешает работать браузеру с cookie 
                ) 

                const payload = data.data.data

                setUserInfo({...userInfo, name: payload.name })
                
            } catch (error) {
                navigate('/')
            }

        }

        checkAuth()

    }, [navigate])
    

    return(
        <header>
            <div className={style.headerInner}>

                <div className={style.logo}>
                    <h1>marketplace</h1>
                </div>

                <div className={style.userInfo}>
                    <p>{userInfo.name ? userInfo.name : ''}</p>
                </div>

            </div>
        </header>
    )
}