import { Context } from "hono";

//function for handing errors
export const handleError = async (error : Error , context : Context) => {

    console.log(error)
    
    context.status(500)
    return context.json({success : false , error : "Server error"})

}