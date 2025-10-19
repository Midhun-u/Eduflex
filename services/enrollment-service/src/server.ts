import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { connectMongodb } from './config/db'
import { enrollmentRouter } from './routes/enrollmentRoute'
import { errorHandleMiddleware } from './middlewares/error'
import { notFound } from './utils/notFound'

//app instance
const app = new Hono({strict : false})
const port : number = Number(Bun.env.PORT)

//middlewares
app.use(logger())
app.use(cors({
  origin : Bun.env.CLIENT_URL as string,
  allowMethods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
  credentials : true
}))

//connecting mongodb
connectMongodb()

//routes
app.onError(errorHandleMiddleware)
app.notFound(notFound)
app.route("/api/enrollment" , enrollmentRouter)

export {app , port}
