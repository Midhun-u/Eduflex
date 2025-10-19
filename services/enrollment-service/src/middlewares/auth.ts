import { Context } from 'hono'
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

//middleware for checking authentication
export const authMiddleware = async (context: Context, next: Function) => {

    try {

        const token = getCookie(context, "authToken")

        if (!token) {
            context.status(400)
            return context.json({ success: false, error: "Unautherized user" })
        }

        const secret = Bun.env.JWT_SECRET as string
        const decode = await verify(token, secret)

        if (!decode) {
            context.status(400)
            return context.json({ success: false, error: "Invalid token" })
        }

        await context.set("userDetails", decode)
        return next()

    } catch (error) {
        throw new Error(`authMiddleware error : ${error}`)
    }

}