import { useDispatch, useSelector } from 'react-redux'
import type { NewProductForm } from '../../types.ts'
import style from './productsPage.module.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../../redux/store.ts'
import type { RootState } from '../../redux/store.ts'
import { getUserInfo, getUserProducts } from '../../redux/thunk/userInfo.ts'
import { createProduct } from '../../redux/thunk/products.ts'


export const ProductsPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getUserInfo())
    }, [navigate])

    const { id, isLoading, products} = useSelector((state: RootState) => state.user)

    const [newProductForm, setNewProductForm] = useState<NewProductForm>({
        name: '',
        text: '',
        price: '',
    })

    const changeProductForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const changeProductFormText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewProductForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const createNewProduct = async () => {

        dispatch(createProduct({
            user_id: id,
            name: newProductForm.name,
            text: newProductForm.text,
            price: Number(newProductForm.price),
        }))

        setNewProductForm({
            name: '',
            text: '',
            price: '',
        })

        if(id){
            dispatch(getUserProducts(id))
        }

    }

    useEffect(() => {
        if(id){
            dispatch(getUserProducts(id))
        }
    }, [id, dispatch])

    return(
        <section className={style.productsPage}>
            <div className={style.productsPageInner}>

                <div className={style.productsPage_title}>
                    <h1>управляйте своим магазином</h1>
                    <Link to={'/market'}>вернуться а главную</Link>
                </div>

                <div className={style.info}>

                    <div className={style.createNewProduct_form}>
                        <h2>создайте новый товар</h2>
                        
                        <input 
                         value={newProductForm.name}
                         name='name' 
                         type="text" 
                         placeholder='введите название...' 
                         onChange={changeProductForm}
                        />

                        <textarea 
                         value={newProductForm.text}
                         name='text' 
                         placeholder='введите описание...' 
                         onChange={changeProductFormText}
                        />

                        <input 
                         value={newProductForm.price}
                         name='price' 
                         type="text" 
                         placeholder='введите цену...' 
                         onChange={changeProductForm}
                        />

                        <button className={style.create_product} onClick={createNewProduct}>создать</button>

                    </div>

                    <div className={style.products_list}>
                        <h2>ваши продукты</h2>

                        {isLoading ? (<p>загрузка...</p>) : null}

                        <div className={style.products_grid}>
                            {products.map((products) => (
                                <div className={style.product_card} key={products.id}>
                                    <h2>{products.name}</h2>

                                    <p>{products.text}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}