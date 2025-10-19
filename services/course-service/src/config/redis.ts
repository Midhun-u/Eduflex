import {createClient} from 'redis'

export const client = createClient({
    url : Bun.env.REDIS_URL
})

//function connecting redis
export const connectRedis = async () => {

    client.on("error" , error => console.log(`Redis error : ${error}`))
    await client.connect()

}