import dotenv from 'dotenv'
import { initDataBase } from './src/db/pool.ts'
import { createAppServer, startServer } from './src/server.ts'
import { userRouter } from './src/api/user.ts'


dotenv.config({path: '../.env'})

const startApp = async () => {

    try {

        await initDataBase()
        const { app, httpServer, io } = createAppServer() 

        app.use('/api/user', userRouter)

        startServer(httpServer)
        
    } catch (error) {
        console.log('возникла ошибка при запуске приложения')
        throw error
    }

}

startApp()