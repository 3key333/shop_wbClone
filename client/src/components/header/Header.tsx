import { useEffect, useState } from 'react'
import style from './header.module.scss'
import type { IUserEntity } from '../../types'
import { useNavigate } from 'react-router-dom'


export const Header = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    if(!token) { 
        navigate('/')
    }

    const [userInfo, setUserInfo] = useState<IUserEntity>({
        name: '',
        role: null,
    })

    useEffect(() => {
        const accountData: IUserEntity = JSON.parse(localStorage.getItem('userInfo'))
        if(accountData){
            setUserInfo(accountData)
        }
    }, [navigate, token])
    

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