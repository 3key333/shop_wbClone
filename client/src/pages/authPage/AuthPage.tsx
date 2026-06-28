import { useEffect } from 'react'
import style from './authPage.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const AuthPage = () => {

    const navigate = useNavigate()

   const token = localStorage.getItem('token')

   if(!token) navigate('/')

    const changeToBuyer = async () => {

    }

    const changeToSeller = async () => {
        
    }

    return(
        <section className={style.authPage}>
            <div className={style.authPageInner}>

                <div className={style.card}>
                    <div className={style.cardInner}>

                        <h2>Как вы хотите использовать приложение ? </h2>

                        <div className={style.choise}>

                            <button className={style.buyer} onClick={changeToBuyer}>покупатель</button>

                            <button className={style.seller} onClick={changeToSeller}>продавец</button>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}