import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import style from './productInfoPage.module.scss'
import type { IProductEntity } from '../../types.ts'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store.ts'
import { getAllProducts } from '../../redux/thunk/products.ts'


export const ProductInfoPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const { id } = useParams<{id: string}>()

    const [product, setProduct] = useState<IProductEntity>({
        id: '',
        user_id: '',
        name: '',
        text: '',
        price: 0,
    })

    useEffect(() => {

        if (!id) return

        const fetchProductInfo = async () => {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/product/${id}`, 
                {withCredentials: true}
            )

            setProduct(data.data)

        }

        fetchProductInfo()

    }, [])

    const deleteProduct = async () => {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/products/product/${id}`,
            {withCredentials: true}
        )

        dispatch(getAllProducts())

        navigate('/market')
    }

    return(
        <section className={style.ProductInfoPage}>
            <div className={style.ProductInfoPageInner}>

                <div className={style.productCard}>

                    <h2>{product?.name ?? null}</h2>

                    <p>{String(product?.price ?? null )}</p>

                    <button onClick={deleteProduct}>удалить</button>

                </div>

            </div>
        </section>
    )
}