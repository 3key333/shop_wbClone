import { useEffect, useRef, useState } from 'react'
import style from './authPage.module.scss'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { io, type Socket } from 'socket.io-client'


export const AuthPage = () => {

    const navigate = useNavigate()

    const [userName, setUserName] = useState<string>('')

    const socketRef = useRef<Socket | null>(null)

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

    useEffect(() => {

        if(!userName) return 

        const newSocket = io('http://localhost:3000')
        socketRef.current = newSocket

        newSocket.emit('join_room', userName)

        return () => {
            newSocket.disconnect()
            socketRef.current = null
        }

    }, [userName])


    const changeToBuyer = async () => {

        await axios.patch(
            `${import.meta.env.VITE_API_URL}/user/add_role`, 
            {name: userName, role: 'buyer'}, 
            {withCredentials: true}
        )

    }

    const changeToSeller = async () => {

        await axios.patch(
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