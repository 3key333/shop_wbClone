import { Router } from "express";
import type { Request, Response } from "express";
import { pool } from '../db/pool.ts'
import { validateNewUserRequestBody } from "../helpers/helpers.ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authToken } from "../helpers/helpers.ts";


export const userRouter = Router()

userRouter.post('/user_info', async (req: Request<{},{},{name: string}>, res: Response) => {

    try {

        const { name } = req.body

        const validate = name && name.trim() !== ''

        if(!validate){
            res.status(400).send('Некорректный запрос')
            return
        }

        const { rows } = await pool.query(
            `SELECT * FROM users
            WHERE name = $1`,
            [name]
        )

        if(!rows[0]){
            res.status(404).send('Такого пользователя не существует')
            return
        }

        res.status(200).json({message: 'Получены данные о пользователе', data: {name: rows[0].name, role: rows[0].role}})
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

userRouter.post('/login', async (req: Request<{},{},{name: string, password: string}>, res: Response) => {

    try {

        const { name, password } = req.body

        const validate = validateNewUserRequestBody(req.body)

        if(!validate){
            res.status(400).send('Некорректный запрос')
            return
        }

        const { rows } = await pool.query(
            `SELECT * FROM users
            WHERE name = $1`,
            [name]
        )

        const hashValidate = await bcrypt.compare(password, rows[0].password_hash)

        if(!hashValidate){
            res.status(404).send('Пользователь не найден')
            return
        }

        const jwtSecretKey = String(process.env.JWT_SECRET)

        const token = jwt.sign(
            {name: rows[0].name},
            jwtSecretKey,
            {expiresIn: '24h'}
        )

        // Устанавливаем HttpOnly Cookie
        res.cookie('token', token, {
            httpOnly: true,        // недоступно js
            secure: true,          // только HTTPS в проде
            sameSite: 'lax',       // csrf защита
            maxAge: 24*60*60*1000  // 24 часа
        })

        res.status(200).json({message: 'Успешный вход', data: rows[0].name})
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

userRouter.post('/new_user', async (req: Request<{},{},{name: string, password: string}>, res: Response) => {

    try {

        const { name, password } = req.body

        const validate = validateNewUserRequestBody(req.body)

        if(!validate){
            res.status(400).send('Некорректный запрос')
            return
        }

        const { rows: isUserExist } = await pool.query(
            `SELECT * FROM users
            WHERE name = $1`,
            [name]
        )

        if(isUserExist.length > 0){
            res.status(409).send('Пользователь с таким именем уже существует')
            return
        }

        const password_hash = await bcrypt.hash(password, 10)

        const {rows: user} = await pool.query(
            `INSERT INTO users(name, password_hash)
            VALUES($1, $2)
            RETURNING name`,
            [name, password_hash]
        )

        const jwtSecretKey = String(process.env.JWT_SECRET)

        const token = jwt.sign(
            {name: user[0].name},
            jwtSecretKey,
            {expiresIn: '24h'}
        )

        // настройка куки токена
        res.cookie('token', token, {
            httpOnly: true,        // недоступно js
            secure: true,          // только HTTPS в проде
            sameSite: 'lax',       // защита от csrf
            maxAge: 24*60*60*1000  // 24h
        })

        res.status(201).json({message: 'Создан пользователь', data: user[0].name})

    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})

userRouter.patch('/add_role', async (req: Request<>, res: Response) => {

    try {

        
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})