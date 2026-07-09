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

    const changeProductInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const changeProductTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProduct((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const updateProduct = async () => {

        await axios.patch(
            `${import.meta.env.VITE_API_URL}/products/update_product`, 
            { 
                id: product.id,
                user_id: product.user_id,
                name: product.name,
                text: product.text,
                price: Number(product.price),
            },
            { withCredentials: true }
        )

        dispatch(getAllProducts())

        navigate('/market')
        
    }

    return(
        <section className={style.ProductInfoPage}>
            <div className={style.ProductInfoPageInner}>

                <div className={style.productCard}>

                    <input
                     name='name' 
                     type="text" 
                     placeholder='название' 
                     value={product.name}
                     onChange={(e) => changeProductInput(e)}
                    />
                    
                    <textarea
                     name='text' 
                     placeholder='описание' 
                     value={product.text}
                     onChange={(e) => changeProductTextarea(e)}
                    />

                    <input 
                     name='price'
                     type="text" 
                     placeholder='цена' 
                     value={product.price}
                     onChange={(e) => changeProductInput(e)}
                    />

                    <button onClick={deleteProduct}>удалить</button>

                    <button onClick={updateProduct}>обновить</button>

                </div>

            </div>
        </section>
    )
}