'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NotFound from '../layout/NotFound'
import { getCourseDetailsApi } from '@/api/course'
import styles from '../../styles/checkout/checkoutPage.module.scss'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAuthUserApi } from '@/api/auth'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntentApi } from '@/api/payment'
import CheckoutForm from './CheckoutForm'
import { getCartItemApi } from '@/api/cart'

const CheckoutPage = () => {

    const { courseId } = useParams()
    const [courseDetails, setCourseDetails] = useState<{
        id: string,
        title: string,
        thumbnail: {
            url: string,
            publicId: string
        },
        educator: {
            id: string,
            fullname: string,
        },
        price: number
    }>()
    const [cartItem, setCartItem] = useState<{
        _id: string,
        userId: string,
        courseId: string,
        cartItemPrice: number
    }>()
    const [clientSecret, setClientSecret] = useState<string>('')
    const { user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

    //function for fetching user
    const handleFetchUser = async () => {


        try {
            dispatch(authRequest())
            const result = await getAuthUserApi()

            if (result?.success) {
                dispatch(authSuccess({ user: result?.user }))
            }


        } catch (error: any) {
            dispatch(authFailed({ error: error.message }))
            console.log(error)
        }

    }

    //function for fetching course details
    const handleFetchCourseDetails = async () => {

        try {

            const result = await getCourseDetailsApi(courseId as string, ['id', 'thumbnail', 'title', 'price', 'educator'])

            if (result?.success) {
                setCourseDetails(result?.courseDetails)
            }

        } catch (error: any) {
            console.log(error)
        }

    }

    //function for fetching cart item
    const handleFetchCartItem = async () => {

        try {

            const result = await getCartItemApi(courseId as string)
            
            if(result?.success){
                setCartItem(result?.cartItem || null)
            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for creating payment intent
    const handleCreatePaymentIntent = async () => {

        try {

            if (courseDetails && user) {

                const result = await createPaymentIntentApi(courseDetails?.id as string, courseDetails?.price as number)
                if (result?.success) {
                    setClientSecret(result?.clientSecret)
                }
            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        if (courseId) {
            handleFetchUser()
            handleFetchCourseDetails()
            handleFetchCartItem()
        }

    }, [courseId])

    useEffect(() => {

        handleCreatePaymentIntent()

    }, [user, courseDetails])

    if (!courseId || !courseDetails) return <NotFound />

    return (

        <section className={styles['container']}>
            <div className={styles['course-details-container']}>
                <p>Pay</p>
                <span className={styles['price']}>&#8377;{courseDetails?.price}</span>
                <div className={styles['course-details']}>
                    {
                        courseDetails?.thumbnail?.url
                        &&
                        <Image className={styles['thumbnail']} src={courseDetails.thumbnail.url} width={80} height={40} alt='' />
                    }
                    <span className={styles['title']}>{courseDetails?.title}</span>
                </div>
            </div>
            <div className={styles['checkout-form-container']}>
                {
                    clientSecret && stripePromise && (

                        <Elements
                            stripe={stripePromise}
                            options={{ clientSecret: clientSecret }}
                        >
                            <CheckoutForm
                                courseId={courseDetails?.id}
                                price={courseDetails?.price}
                                couresEducatorId={courseDetails?.educator?.id}
                                cartItemId={cartItem?._id}
                            />
                        </Elements>

                    )
                }
            </div>
        </section>

    )
}

export default CheckoutPage