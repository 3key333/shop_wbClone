import type { Request, Response } from "express";
import { Router } from "express";
import { pool } from "../db/pool.ts";

export const productsRouter = Router()


productsRouter.get('/user/:id', async (req: Request<{id: string}>, res: Response) => {
    try {

        const { id } = req.params

        const { rows } = await pool.query(
            `SELECT * FROM products
            WHERE user_id = $1`,
            [id]
        )

        if(rows.length === 0){
            return res.status(204).json({message: 'У пользователя нет продуктов', data: rows})
        }

        res.status(200).json({message: 'Получены продукты пользователя', data: rows})


        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }
})