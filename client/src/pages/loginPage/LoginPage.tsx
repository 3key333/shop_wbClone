import { useState } from 'react'
import style from './loginPage.module.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const LoginPage = () => {

    const navigate = useNavigate()

    const [isReg, setIsReg] = useState<boolean>(true)
    
    const [userInfo, setUserInfo] = useState<{userName: string, password: string}>({
        userName: '',
        password: '',
    })

    const handlerClickToChangeReg = () => {
        setIsReg(!isReg)
        setUserInfo({userName: '', password: '',})
    }

    const handlerChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const createNewUser = async () => {

        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/new_user`, 
            {name: userInfo.userName, password: userInfo.password},
            { withCredentials: true }
        )

        const userPayload = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/user_info`,
            {name: data.data}
        )
    
        localStorage.setItem('userInfo', JSON.stringify(userPayload?.data.data))

        navigate('auth')
    }

    const loginToAccount = async () => {

        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/login`,
            {name: userInfo.userName, password: userInfo.password},
            { withCredentials: true } // разрешает работать браузеру с cookie 
        )

        const userPayload = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/user_info`,
            {name: data.data}
        )

        console.log(data.data)
            
        localStorage.setItem('userInfo', JSON.stringify(userPayload?.data.data))
    
        navigate('auth')
    }


    return(
        <section className={style.loginPage}>
            <div className={style.loginPageInner}>

                <div className={style.card}>
                    <div className={style.cardInner}>

                        <div style={{display: isReg? '':'none'}} className={style.reg}>

                            <div className={style.reg_tiitle}>
                                <h2>Регистрация</h2>
                                <p> уже есть аккаунт ? <span onClick={handlerClickToChangeReg}>войти</span> </p>
                            </div>

                            <div className={style.reg_info}>

                                <div className={style.name}>
                                    <input 
                                     name='userName' 
                                     type="text" 
                                     placeholder='введите ваше имя'
                                     onChange={handlerChangeUserInfo}
                                    />
                                </div>

                                <div className={style.password}>
                                    <input 
                                     name='password' 
                                     type="password" 
                                     placeholder='придумайте пароль'
                                     onChange={handlerChangeUserInfo}
                                    />
                                </div>

                            </div>

                            <div className={style.reg_submitButton}>
                                <button onClick={createNewUser}>создать аккаунт</button>
                            </div>

                        </div>

                        <div style={{display: isReg? 'none':''}} className={style.login}>

                            <div className={style.login_tiitle}>
                                <h2>Вход</h2>
                                <p> нету аккаунта ? <span onClick={handlerClickToChangeReg}>зарегестрироваться</span> </p>
                            </div>

                            <div className={style.login_info}>

                                <div className={style.login_name}>
                                    <input 
                                     name='userName'
                                     type="text" 
                                     placeholder='введите ваше имя'
                                     onChange={handlerChangeUserInfo}
                                    />
                                </div>

                                <div className={style.login_password}>
                                    <input 
                                     name='password'
                                     type="password" 
                                     placeholder='введите пароль'
                                     onChange={handlerChangeUserInfo}
                                    />
                                </div>

                            </div>

                            <div className={style.login_submitButton}>
                                <button onClick={loginToAccount}>войти</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )

}