import { useEffect, useState } from 'react'
import style from './authPage.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const AuthPage = () => {

    const navigate = useNavigate()

    const [userName, setUserName] = useState<string>('')

    useEffect(() => {

        const fetchUserName = async () => {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/user/me`,
                {withCredentials: true}
            )

            setUserName(data.data.name)
        }

        fetchUserName()

    }, [navigate])


    const changeToBuyer = async () => {

        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/user/add_role`, 
            {name: userName, role: 'buyer'}, 
            {withCredentials: true}
        )

        navigate('/market')

    }

    const changeToSeller = async () => {

        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/user/add_role`, 
            {name: userName, role: 'seller'}, 
            {withCredentials: true}
        )

        navigate('/market')

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