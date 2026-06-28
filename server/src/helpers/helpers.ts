import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

export const validateNewUserRequestBody = (data: {name: string, password: string}) => {

    const validate = data.name && data.password &&
    data.name.trim() !== '' && data.password.trim() !== ''

    if(validate) return true

    return false

}

export const authToken = (req: Request<{},{},{name: string}>, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization // Bearer xxx
    // Это чтение HTTP-заголовка Authorization из входящего запроса.
    // Обычно клиент шлет: Authorization: Bearer <token>.
    // В Express это строка или undefined, если заголовка нет.

    if(!authHeader?.startsWith('Bearer ')){
        //строка ничинается с 'Bearer' ?
        return res.status(401).send('Требуется авторизация')
    }

    const token = authHeader.slice(7, authHeader.length) // убираем 'Bearer'

    try {

        const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as {name: string}
        // Если токен корректный — возвращает payload (данные внутри токена).

        next() // чтобы чепочка не остановилась просто идем дальше поо к
        
    } catch (error) {
        res.status(401).send('Невалидный или просроченный токен')
    }

}