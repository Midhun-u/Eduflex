import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDatabase = async () => {

    try {

        const URL : string = process.env.DB_URL as string
        const connection = await mongoose.connect(URL)
        console.log(`Database connected ${connection.connection.host}`)
        
    } catch (error) {
        console.log(`Database is not connected error : ${error}`)  
    }

}