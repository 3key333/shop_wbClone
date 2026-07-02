import { createClient, RedisClient } from 'redis'

export const redisClient = createClient({    // создаём клиент
    url: process.env.REDIS_URL
})

redisClient.on('error', (error) => {        // обработчик ошибок
    console.log('❌ ошибка Redis:', error)
})

export const initRedis = async () => {         // функция инициализации 
    await redisClient.connect()
    console.log('✔️ Redis подключён')
}