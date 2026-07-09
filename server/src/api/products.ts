import type { Request, Response } from "express";
import { Router } from "express";
import { pool } from "../db/pool.ts";
import { authToken, validateNewProduct, validateUpdateProduct } from "../helpers/helpers.ts";
import { IProductEntity, NewProduct } from "../../types.ts";
import { redisClient } from "../db/redis.ts";
import { io } from "../server.ts";

export const productsRouter = Router()

productsRouter.get('/product/:id', authToken, async (req: Request<{id:string}>, res: Response) => {

    try {

        const { id } = req.params

        if(!id || id.trim() === ''){
            return res.status(400).send('Некорректные данные')
        }

        const { rows } = await pool.query(
            `SELECT * FROM products
            WHERE id = $1`,
            [id]
        )

        res.status(200).json({message: 'Получены данные о товаре', data: rows[0]})
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

productsRouter.get('/user/:id', authToken ,async (req: Request<{id: string}>, res: Response) => {
    try {

        const { id } = req.params

        const { rows } = await pool.query(
            `SELECT * FROM products
            WHERE user_id = $1`,
            [id]
        )

        if(rows.length === 0){
            return res.status(200).json({message: 'У пользователя нет продуктов', data: []})
        }

        res.status(200).json({message: 'Получены продукты пользователя', data: rows})


        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }
})

productsRouter.get('', authToken, async (req: Request, res: Response) => {

    try {

        // 1. Пробуем взять из кэша
        const cached = await redisClient.get('products:all')
        //                                 'products:all' — это ключ. 
        //                                  Принято именовать через двоеточие (сущность:уточнение) — так удобно группировать ключи.

        if(cached){
            return res.status(200).json({message: 'Получены данные (из кэша)', data: JSON.parse(cached)})
        }

        // 2. В кэше нет — идём в БД
        const { rows } = await pool.query(
            `SELECT * FROM products`
        )

        if(rows.length === 0){
            return res.status(200).json({message: 'сейчас в магазине нет товаров', data: []})
        }

        // 3. Кладём в кэш на 60 секунд
        await redisClient.set('products:all', JSON.stringify(rows), {EX: 60})
        // { EX: 60 } — TTL (time to live), 
        // автоудаление ключа через 60 секунд. 
        // Это защита от устаревших данных: даже если забудешь очистить кэш, 
        // через минуту он обновится сам.
        
        res.status(200).json({message: 'Получены товары', data: rows})

    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

productsRouter.post('/create_new_product', authToken, async (req: Request<{},{},NewProduct>, res: Response) => {

    try {

        // Тут есть подвох: если продавец добавил товар,
        // а кэш ещё "живой" 60 секунд — новый товар не покажется.
        // Поэтому при создании товара удаляем ключ кэша (инвалидация).

        const { user_id, name, text, price } = req.body

        const validate = validateNewProduct(req.body)

        if(!validate){
            return res.status(400).send('Некорректный запрос')
        }

        const { rows } = await pool.query(
            `INSERT INTO products(user_id, name, text, price)
            VALUES($1, $2, $3, $4)
            RETURNING id, name, text, price`,
            [user_id, name, text, price]
        )

        await redisClient.del('products:all')

        io.emit('new_product', rows[0])

        res.status(201).json({message: 'Создан новый продукт', data: rows[0]})
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

productsRouter.patch('/update_product', authToken, async (req: Request<{},{},IProductEntity>, res: Response) => {

    try {

        const { id, user_id, name, text, price } = req.body
        const user_name: string = res.locals.user.name

        const validate = validateUpdateProduct(req.body)

        if(!validate){
            return res.status(400).send('Некорректный запрос')
        }

        const user = await pool.query(
            `SELECT name FROM users
            WHERE id = $1`,
            [user_id]
        )

        if(!user.rows[0] || user.rows[0].name !== user_name){
            return res.status(403).send('Нет прав на изменение этого товара')
        }

        const { rows: me } = await pool.query(
            `SELECT id FROM users
            WHERE name = $1`,
            [user_name]
        )

        const myId = me[0].id

        const result = await pool.query(
            `UPDATE products
            SET name = $1, text = $2, price = $3
            WHERE id = $4 AND user_id = $5`,
            [name, text, price, id, myId]
        )

        if(result.rowCount === 0){
            return res.status(404).send('Товар не найден или не принадлежит вам')
        }

        await redisClient.del('products:all')

        const { rows } = await pool.query(
            `SELECT * FROM products
            WHERE id = $1`,
            [id]
        )

        io.emit('update_product', rows[0])
        
        res.status(200).send(`Обновили продукт ${id}`)

    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

productsRouter.delete('/product/:id', authToken, async (req: Request<{id: string}>, res: Response) => {
    
    try {
        
        const { id } = req.params

        if(!id || id.trim() === ''){
            return res.status(400).send('Некорректные данные')
        }

        await pool.query(
            `DELETE FROM products
            WHERE id = $1`,
            [id]
        )

        await redisClient.del('products:all')

        io.emit('delete_product', id)

        res.status(200).send(`Удалили продукт ${id}`)
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }
})



