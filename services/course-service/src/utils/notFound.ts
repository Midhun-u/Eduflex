import { Context } from "hono";

export const notFound = (context : Context) => {

    context.status(404)
    return context.json({success : false , error : "Route not found"})

}