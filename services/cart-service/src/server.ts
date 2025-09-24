import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { errorHandling } from './middlewares/error'
import { notFound } from './utils/notFound'
import { connectMongodb } from './config/db'
import { cartRouter } from './routes/cartRoutes'

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
app.route("/api/cart" , cartRouter)

//connecting database
connectMongodb()

export {app , port}
