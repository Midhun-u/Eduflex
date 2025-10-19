import { Context } from "hono";

//function for handing error
export const errorHandleMiddleware = (error : Error , context : Context) => {

    console.log(error)
    context.status(500)
    return context.json({success : false , error : "Server error"})

}