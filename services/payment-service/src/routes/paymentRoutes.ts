import { Hono } from "hono"
import { createPaymentIntentCartController, createPaymentIntentController } from "../controllers/paymentController"
import { authMiddleware } from "../middlewares/auth"

//payment router
export const paymentRouter = new Hono()

paymentRouter.use(authMiddleware) // applying auth middleware

//route for creating payment intent
paymentRouter.post("/create-checkout-intent/single" , createPaymentIntentController)

//route for creating payment intent for cart items
paymentRouter.post("/create-checkout-intent/cart" , createPaymentIntentCartController)