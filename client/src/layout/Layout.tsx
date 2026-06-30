import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { AuthPage } from '../pages/authPage/AuthPage'
import { LoginPage } from '../pages/loginPage/LoginPage'
import { MarketPage } from '../pages/marketPage/MarketPage'
import style from './layout.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export const Layout = () => {
    return(
        <BrowserRouter>
            <div className={style.layout}>
                <Header/>
                    <main>
                        <Routes>
                            <Route path='/' element={<LoginPage/>}/>
                            <Route path='/auth' element={<AuthPage/>}/>
                            <Route path='/market' element={<MarketPage/>}/>
                        </Routes>
                    </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
