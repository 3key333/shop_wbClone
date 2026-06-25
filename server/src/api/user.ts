import { Router } from "express";
import type { Request, Response } from "express";


export const userRouter = Router()

userRouter.post('/', async (req: Request, res: Response) => {

    try {

        
        
    } catch (error) {
        res.status(500).send('На сервере произошла ошибка')
    }

})