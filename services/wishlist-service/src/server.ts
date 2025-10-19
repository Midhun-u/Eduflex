import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { wishlistRouter } from './routes/wishlistRoute'
import { notFound } from './utils/notFound'
import { connectMongodb } from './config/db'

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

//routes
app.notFound(notFound)
app.route("/api/wishlist" , wishlistRouter)

//connecting mongodb
connectMongodb()

export {app , port}
