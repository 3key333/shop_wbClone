import { useNavigate } from 'react-router-dom'
import style from './marketPage.module.scss'
import { useEffect } from 'react'
import { getUserInfo } from '../../redux/thunk/userInfo.ts'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store.ts'
import { getAllProducts } from '../../redux/thunk/products.ts'


export const MarketPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [navigate, dispatch])

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const { products } = useSelector((state: RootState) => state.market)

    return(
        <section className={style.market}>
            <div className={style.marketInner}>
                
                <div className={style.products_grid}>
                    {products.map((product) => (
                        <div className={style.product_card} key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.text}</p>
                            <span>{product.price} ₽</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}