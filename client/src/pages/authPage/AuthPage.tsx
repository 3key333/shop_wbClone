import { useEffect, useState } from 'react'
import style from './authPage.module.scss'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


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

    }

    const changeToSeller = async () => {

        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/user/add_role`, 
            {name: userName, role: 'seller'}, 
            {withCredentials: true}
        )

    }

    return(
        <section className={style.authPage}>
            <div className={style.authPageInner}>

                <div className={style.card}>
                    <div className={style.cardInner}>

                        <h2>Как вы хотите использовать приложение ? </h2>

                        <div className={style.choise}>

                            <Link className={style.buyer} onClick={changeToBuyer} to={'/market'}>покупатель</Link>

                            <Link className={style.seller} onClick={changeToSeller} to={'/market'}>продавец</Link>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}