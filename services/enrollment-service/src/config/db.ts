import mongoose from "mongoose"

//function for connecting database
export const connectMongodb = async () => {

    try {
        
        const connection = await mongoose.connect(Bun.env.MONGODB_URL as string)
        console.log(`Mongodb is connected ${connection.connection.host}`)

    } catch (error) {
        console.log(`Mongodb is not connected error : ${error}`)
    }

}