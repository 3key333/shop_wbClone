import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { IProductEntity, NewProduct } from "../../types"


export const authToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.token

    if(!token){
        return res.status(401).send('Не авторизован')
    }

    try {

        const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as {name: string}
        // Если токен корректный — возвращает payload (данные внутри токена).
        res.locals.user = payload
        next() // чтобы чепочка не остановилась просто идем дальше поо к
        
    } catch (error) {
        res.status(401).send('Невалидный или просроченный токен')
    }

}

export const validateNewUserRequestBody = (data: {name: string, password: string}) => {

    const validate = data.name && data.password &&
    data.name.trim() !== '' && data.password.trim() !== ''

    if(validate) return true

    return false

}

export const validateNewProduct = (data: NewProduct) => {

    const validate = data.name &&
    data.text && data.user_id && data.price && data.name.trim() !== '' &&
    data.text.trim() !== '' && data.user_id !== '' && Number(data.price) > 0

    return validate

}

export const validateUpdateProduct = (data: IProductEntity) => {

    const validate = data.id && data.user_id &&
    data.name && data.text && data.price && data.name.trim() !== '' && 
    data.text.trim() !== '' && Number(data.price) > 0

    return validate

}