import { Context } from "hono"
import { stripe } from "../config/stripe"
import { convertNumber } from "../utils/convertNumber"

//controller for creating payment intent
export const createPaymentIntentController = async (context: Context) => {

    try {

        const userDetails = context.get("userDetails")

        const { courseId, price } = await context.req.json<{ courseId: string, price: number | string }>() || {}

        if (!courseId || !price) {
            context.status(400)
            return context.json({ success: false, error: "Fields are missing" })
        }

        if (!userDetails) {
            context.status(400)
            return context.json({ success: false, error: "User details are missing" })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertNumber(price) * 100,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                courseId: courseId,
                userId: userDetails.id
            }
        })

        return context.json({ success: true, clientSecret: paymentIntent.client_secret })

    } catch (error: any) {
        throw new Error(`processPaymentController error : ${error}`)
    }

}

//controller for creating payment intent for cart items
export const createPaymentIntentCartController = async (context: Context) => {

    try {

        const userDetails = context.get("userDetails")
        const {cartTotalPrice} = await context.req.json<{cartTotalPrice : number | string}>() || {}

        if (!cartTotalPrice) {
            context.status(400)
            return context.json({ success: false, error: "Fields are missing" })
        }

        if (!userDetails) {
            context.status(400)
            return context.json({ success: false, error: "User details are missing" })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertNumber(cartTotalPrice) * 100,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                userId: userDetails.id
            }
        })

        return context.json({ success: true, clientSecret: paymentIntent.client_secret })

    } catch (error) {
        throw new Error(`createPaymentIntentCartController error ; ${error}`)
    }

}