import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDatabase } from './config/db.js'
import { authRouter } from './routes/authRoute.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

// express instance
const app = express()

const PORT:number = Number(process.env.PORT)
const clientURL = process.env.CLIENT_URL

//middlewares
app.use(morgan("dev"))
app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({origin : clientURL , methods : ['GET' , 'POST' , 'DELETE' , 'PUT'] , credentials : true}))

//routes
app.use("/api/auth" , authRouter)


app.listen(PORT , () => {

    console.log(`SERVER RUNNING ON ${PORT} PORT`)

    //Database connection
    connectDatabase()

})