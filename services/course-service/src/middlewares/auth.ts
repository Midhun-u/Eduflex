import { Context } from "hono"
import { getCookie } from 'hono/cookie'
import { verify } from 'hono/jwt'

//middleware for checking authentication
export const authMiddleware = async (context: Context, next: Function) => {

    const token = getCookie(context, "authToken")

    try {

        if (!token) {
            context.status(400)
            return context.json({ success: false, error: "Unautherized user" })
        }

        const secret = Bun.env.JWT_SECRET as string
        const decode = await verify(token, secret)

        if (decode) {

            await context.set('userDetails', decode)
            return next()

        } else {

            context.status(400)
            return context.json({ success: false, error: 'Invalid token' })

        }


    } catch (error) {
        throw new Error(`authMiddleware error : ${error}`)
    }

} 