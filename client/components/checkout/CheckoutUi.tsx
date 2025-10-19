import React from 'react'
import styles from '../../styles/checkout/checkoutUi.module.scss'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'
import { PaymentElement } from '@stripe/react-stripe-js'

interface CheckoutUiProps {
    loading: boolean
}

const CheckoutUi = ({ loading = false }: CheckoutUiProps) => {

    const router = useRouter()

    return (

        <div>
            <PaymentElement />
            <div className={styles['button-container']}>
                <Button loading={loading} loadingColor='white' title='Pay' className='pay-button' type='submit' />
                <Button onClick={() => router.back()} title='Cancel' className='payment-cancel-button' type='button' />
            </div>
        </div>

    )
}

export default CheckoutUi