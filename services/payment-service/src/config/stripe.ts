import Stripe from "stripe"

export const stripe = new Stripe(Bun.env.STRIPE_SECRET_KEY as string)