'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/cart/cartCheckout.module.scss'
import { CartCheckoutItemType } from '@/types/cartCheckoutItemType'
import { getCartListItemsApi } from '@/api/cart'
import { getCourseDetailsApi } from '@/api/course'
import NotFound from '../layout/NotFound'
import Image from 'next/image'
import { createCartPaymentIntentApi } from '@/api/payment'
import CartCheckoutForm from './CartCheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const CardCheckoutPage = () => {

    const [cartCheckoutItems, setCartCheckoutItems] = useState<CartCheckoutItemType[]>([])
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0)
    const [clientSecret, setClientSecret] = useState<string>('')
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

    //function for getting user cart items
    const handleGetCartItems = async () => {

        try {
            const cartResult = await getCartListItemsApi(1, 100)

            if (cartResult?.success) {

                const cartItems = await Promise.all(cartResult?.cartItems?.map(async (cartItem: { _id: string, userId: string, courseId: string }) => {

                    const courseResult = await getCourseDetailsApi(cartItem?.courseId, ['title', 'thumbnail', 'price', 'educator'])

                    if (courseResult?.success) {

                        return {
                            ...cartItem,
                            courseDetails: { ...courseResult?.courseDetails }
                        }

                    }

                }) || [])

                setCartCheckoutItems(cartItems || [])

            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for getting total cart price
    const handleGetTotalCartPrice = async () => {

        try {
            if (cartCheckoutItems.length) {

                const totalPrice = cartCheckoutItems.reduce((accumulator, cartItem) =>
                    accumulator + cartItem.cartItemPrice
                    , 0)


                setCartTotalPrice(totalPrice)

            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for creating payment intent
    const handleCreatePaymentIntent = async () => {

        try {

            if (!cartCheckoutItems.length || !cartTotalPrice) return

            const paymentResult = await createCartPaymentIntentApi(cartTotalPrice)

            if (paymentResult?.success) {
                setClientSecret(paymentResult?.clientSecret)
            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleGetCartItems()
    }, [])

    useEffect(() => {
        handleGetTotalCartPrice()
    }, [cartCheckoutItems.length])

    useEffect(() => {
        handleCreatePaymentIntent()
    }, [cartCheckoutItems.length, cartTotalPrice])

    if (!cartCheckoutItems.length) return <div><NotFound /></div>

    return (

        <section className={styles['container']}>
            <div className={styles['cart-list-container']}>
                <div className={styles['price-details']}>
                    <p>Pay</p>
                    <span className={styles['total-price']}>&#8377;{cartTotalPrice}</span>
                </div>
                <div className={styles['cart-list']}>
                    {
                        cartCheckoutItems.map((cartCheckoutItem) => (

                            <div key={cartCheckoutItem?._id} className={styles['cart-item']}>
                                {
                                    cartCheckoutItem?.courseDetails?.thumbnail?.url
                                    &&
                                    <Image className={styles['thumbnail']} src={cartCheckoutItem.courseDetails.thumbnail.url} width={80} height={40} alt='' />
                                }
                                <div className={styles['details']}>
                                    <p>{cartCheckoutItem.courseDetails.title}</p>
                                    <p>&#8377;{cartCheckoutItem.courseDetails.price}</p>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
            {
                clientSecret
                &&
                <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
                    <CartCheckoutForm 
                        cartCheckoutItems={cartCheckoutItems}
                    />
                </Elements>

            }
        </section>

    )
}

export default CardCheckoutPage