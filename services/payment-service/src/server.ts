import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {logger} from 'hono/logger'
import { paymentRouter } from './routes/paymentRoutes'
import { notFound } from './utils/notFound'
import { handleError } from './middlewares/error'

const app = new Hono({strict : false})
const port = Number(Bun.env.PORT)

//middlewares
app.use(logger())
app.use(cors({
  origin : Bun.env.CLIENT_URL as string,
  allowMethods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
  credentials : true
}))

//routes
app.notFound(notFound)
app.onError(handleError)
app.route("/api/payment" , paymentRouter)

export {app , port}
