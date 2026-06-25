import { useState, type ChangeEvent } from 'react'
import style from './loginPage.module.scss'


export const LoginPage = () => {

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

    console.log(userInfo)


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
                                <button>создать аккаунт</button>
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
                                     placeholder='придумайте пароль'
                                     onChange={handlerChangeUserInfo}
                                    />
                                </div>

                            </div>

                            <div className={style.login_submitButton}>
                                <button>войти</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )

}