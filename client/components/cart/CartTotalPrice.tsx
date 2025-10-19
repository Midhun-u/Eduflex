'use client'

import React from 'react'
import styles from '../../styles/cart/cartTotalPrice.module.scss'
import Button from '../ui/Button'
import {useRouter} from 'next/navigation'
import {
    CreditCard as PaymentIcon
} from 'lucide-react'
import { useAppSelector } from '@/store/hooks'

const CartTotalPrice = () => {

    const router = useRouter()
    const {totalCartPrice} = useAppSelector(state => state.cartReducer)

    if(!totalCartPrice) return null

    return (

        <div className={styles['container']}>
            <div className={styles['price-card']}>
                <div className={styles['total-price']}>
                    <p>Total</p>
                    <p>₹{totalCartPrice}</p>
                </div>
                <Button onClick={() => router.push('/cart/checkout')} className='payment-button' type='button'>
                    <PaymentIcon 
                        strokeWidth={1.5}
                        size={20}
                     />
                    <span>Proceed to checkout</span>
                </Button>
                <Button onClick={() => router.push("/courses")} title='Continue enrolling' type='button' className='course-nav-button' />
            </div>
        </div>

    )
}

export default CartTotalPrice