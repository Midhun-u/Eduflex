import React from 'react'
import styles from '../../../../../styles/pages/checkout.module.scss'
import CheckoutPage from '@/components/checkout/CheckoutPage'

const page = () => {
    
  return (

    <main className={styles['container']}>
        <CheckoutPage />
    </main>

  )
}

export default page