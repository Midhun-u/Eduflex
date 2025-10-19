import { Hono } from 'hono'
import {logger} from 'hono/logger'

import {cors} from 'hono/cors'
import { notFound } from './utils/notFound'
import { courseRouter } from './routes/courseRoute'
import { connectRedis } from './config/redis'
import { errorHandling } from './middlewares/error'
import { rateRouter } from './routes/rateRoute'
import { connectDatabase } from './config/sequelize'

//app instance
const app = new Hono({strict : false})
const port : number = Number(Bun.env.PORT)

//middlewares
app.use(logger())
app.use(cors({
  origin : Bun.env.CLIENT_URL as string,
  allowMethods : ["GET" , "POST" , "PUT" , "DELETE"],
  credentials : true
}))

//routes
app.onError(errorHandling)
app.notFound(notFound)
app.route("/api/course" , courseRouter)
app.route("/api/rate" , rateRouter)

//connecting database
connectDatabase()
//connection redis
connectRedis()

export {app , port}