import { Footer } from '../components/footer/Footer.tsx'
import { Header } from '../components/header/Header.tsx'
import { AuthPage } from '../pages/authPage/AuthPage.tsx'
import { LoginPage } from '../pages/loginPage/LoginPage.tsx'
import { MarketPage } from '../pages/marketPage/MarketPage.tsx'
import { ProductInfoPage } from '../pages/ProductInfoPage/ProductInfoPage.tsx'
import { ProductsPage } from '../pages/ProductsPage/ProductsPage.tsx'
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
                            <Route path='/market/products' element={<ProductsPage/>}/>
                            <Route path='/product/:id' element={<ProductInfoPage/>}/>
                        </Routes>
                    </main>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
