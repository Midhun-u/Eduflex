import { Context } from "hono";

//middleware for handling error
export const errorHandling = (error: Error, context: Context) => {

    console.log(error.message)

    context.status(500)
    return context.json({ 
        success: false, 
        error: 'Server error' 
    })

}