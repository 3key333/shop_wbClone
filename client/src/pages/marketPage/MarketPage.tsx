import { useNavigate } from 'react-router-dom'
import style from './marketPage.module.scss'
import { useEffect, useState } from 'react'
import { getUserInfo } from '../../redux/thunk/userInfo.ts'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store.ts'
import { getAllProducts } from '../../redux/thunk/products.ts'
import { addProduct, removeProduct } from '../../redux/slice/marketSlice.ts'
import { socket } from '../../socket.ts'
import { addProductToCart, deleteProductToCart } from '../../redux/slice/userSlice.ts'
import type { IProductEntity } from '../../types.ts'


export const MarketPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { role, id, cart } = useSelector((state: RootState) => state.user)
    const { products } = useSelector((state: RootState) => state.market)

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

    const redirectToProduct = (productId: string, sellerId: string) => {
        if(role === 'seller' && id === sellerId){
            navigate(`/product/${productId}`)
        }else{
            alert('это не ваш продукт')
        }
    }

    const addToCart = (product: IProductEntity) => {
        const find = cart.find( el => el.id === product.id)

        if(!find){
            dispatch(addProductToCart(product))
        }else{
            dispatch(deleteProductToCart(product))
        }

    }
    

    return(
        <section className={style.market}>
            <div className={style.marketInner}>
                
                <div className={style.products_grid}>
                    {products.map((product) => (
                        <div className={style.product_card} key={product.id} onClick={role === 'seller' ? () => redirectToProduct(product.id, product.user_id) : null}>

                            <h2>{product.name}</h2>
                            <p>{product.text}</p>
                            <span>{product.price} ₽</span>

                            <div className={style.buy_btn}>
                                <button
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(product)
                                 }}
                                >
                                    {cart.some(el => el.id === product.id) ? 'в корзине' : 'купить'}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}