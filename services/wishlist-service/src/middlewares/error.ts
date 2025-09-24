import { Context } from "hono";

//middleware for handing error
export const handleError = (error : Error , context : Context) => {

    console.log(error)
    context.status(500)
    return context.json({success : false , error : "Server error"})

}