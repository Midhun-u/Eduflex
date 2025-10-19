import {useElements, useStripe } from '@stripe/react-stripe-js'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'
import CheckoutUi from '../checkout/CheckoutUi'
import styles from '../../styles/cart/cartCheckoutForm.module.scss'
import { CartCheckoutItemType } from '@/types/cartCheckoutItemType'
import { enrollCourseApi } from '@/api/enrollment'
import { deleteCartItemApi } from '@/api/cart'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { courseRequest, courseFailed } from '@/store/courseSlice'
import { authSuccess } from '@/store/authSlice'

interface CartCheckoutFormProps {
   cartCheckoutItems : CartCheckoutItemType[]
}

const CartCheckoutForm = ({ cartCheckoutItems }: CartCheckoutFormProps) => {

    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const {loading} = useAppSelector(state => state.courseReducer)
    const dispatch = useAppDispatch()

    //function for paymenting
    const handlePayment = async (event: FormEvent) => {

        event.preventDefault()

        try {

            if (!stripe || !elements) return

            dispatch(courseRequest())
            const {error , paymentIntent} = await stripe.confirmPayment({
                elements : elements,
                confirmParams : {},
                redirect : "if_required"
            })

            if(error){
                dispatch(courseFailed({error : error.message}))
                toast.error("Payment Cancelled")
                console.log(error)
                return
            }

            if(paymentIntent.status === "succeeded"){
               
                cartCheckoutItems.map(async(cartCheckoutItem) => {

                    await Promise.all([
                        enrollCourseApi(cartCheckoutItem?.courseId , cartCheckoutItem.cartItemPrice , cartCheckoutItem.courseDetails.educator.id),
                        deleteCartItemApi(cartCheckoutItem?._id)
                    ])

                })

                dispatch(authSuccess({message : "Payment Success"}))
                toast.success("Payment success")
                router.push("/my-learnings")

            }

        } catch (error) {
            toast.error("Payment cancelled")
            console.log(error)
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

export default CartCheckoutForm