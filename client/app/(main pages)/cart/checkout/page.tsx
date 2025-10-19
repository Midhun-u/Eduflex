import React from 'react'
import styles from '../../../../styles/pages/cartCheckout.module.scss'
import CardCheckoutPage from '@/components/cart/CardCheckoutPage'

const page = () => {

  return (

    <main className={styles['container']}>
        <CardCheckoutPage />
    </main>

  )
}

export default page