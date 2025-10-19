'use client'

import React, { FormEvent } from 'react'
import styles from '../../styles/checkout/checkoutForm.module.scss'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { courseFailed, courseRequest, courseSuccess } from '@/store/courseSlice'
import { enrollCourseApi } from '@/api/enrollment'
import { deleteCartItemApi } from '@/api/cart'
import CheckoutUi from './CheckoutUi'

interface CheckoutFormProps {
    courseId: string,
    price: number,
    couresEducatorId : string,
    cartItemId : string | undefined,
}

const CheckoutForm = ({ courseId , price, cartItemId ,couresEducatorId }: CheckoutFormProps) => {

    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const {loading} = useAppSelector(state => state.courseReducer)
    const dispatch = useDispatch()

    //fuction for paymenting
    const handlePayment = async (event : FormEvent) => {

        event.preventDefault()

        
        try{
            
            if(!stripe || !elements) return
    
            dispatch(courseRequest())
            const {error , paymentIntent} = await stripe.confirmPayment({
                elements : elements,
                confirmParams : {},
                redirect : "if_required",
            })

            if(error){
                dispatch(courseFailed({error : error.message}))
                console.log(error.message)
                return
            }

            if(paymentIntent.status === "succeeded"){
                
                const enrollmentResult = await enrollCourseApi(courseId , price , couresEducatorId)
                if(enrollmentResult?.success){

                    if(cartItemId){
                        await deleteCartItemApi(cartItemId)
                    }
                    
                    dispatch(courseSuccess({message : enrollmentResult?.message}))
                    toast.success("Payment Success")
                    router.push(`/my-learnings/learn/${courseId}`)
                    return
                }

            }

            dispatch(courseFailed({error : "Payment failed"}))

        } catch (error : any) {
            dispatch(courseFailed({error : error?.message}))
            console.log(error)
            toast.error("Payment cancelled")
        }

    }

    return (

        <form onSubmit={handlePayment} className={styles['form-container']}>
            <CheckoutUi
                loading={loading}
            />
        </form>

    )
}

export default CheckoutForm