import { useDispatch } from 'react-redux'
import type { NewProductForm } from '../../types.ts'
import style from './productsPage.module.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../../redux/store.ts'


export const ProductsPage = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const [newProductForm, setNewProductForm] = useState<NewProductForm>({
        name: '',
        text: '',
        price: '',
    })

    const changeProductForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

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
                        
                        <input name='name' type="text" placeholder='введите название...'/>

                        <textarea name='text' placeholder='введите описание...'/>

                        <input name='price' type="text" placeholder='введите цену...'/>

                        <button className={style.create_product}>создать</button>

                    </div>

                    <div className={style.products_list}>
                        <h2>ваши продукты</h2>
                    </div>

                </div>

            </div>
        </section>
    )
}