import { useNavigate } from 'react-router-dom'
import style from './marketPage.module.scss'
import { useEffect } from 'react'
import { getUserInfo } from '../../redux/thunk/userInfo.ts'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store.ts'
import { getAllProducts } from '../../redux/thunk/products.ts'
import { addProduct, removeProduct } from '../../redux/slice/marketSlice.ts'
import { socket } from '../../socket.ts'


export const MarketPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { role } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        dispatch(getUserInfo())
    }, [navigate, dispatch])

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {

        socket.on('new_product', (data) => {
            dispatch(addProduct(data))
        })

        socket.on('delete_product', (data) => {
            dispatch(removeProduct(data))
        })

        return () => {
            socket.off('new_product')
            socket.off('delete_product')
        }

    }, [dispatch])

    const redirectToProduct = (id: string) => {
        if(role === 'seller') navigate(`/product/${id}`)
        return
    }

    const { products } = useSelector((state: RootState) => state.market)

    return(
        <section className={style.market}>
            <div className={style.marketInner}>
                
                <div className={style.products_grid}>
                    {products.map((product) => (
                        <div className={style.product_card} key={product.id} onClick={() => redirectToProduct(product.id)}>
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