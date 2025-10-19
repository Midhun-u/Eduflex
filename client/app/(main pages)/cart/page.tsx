import React, { Suspense } from 'react'
import styles from '../../../styles/pages/cart.module.scss'
import Spinner from '@/components/ui/Spinner'
import CartPage from '@/components/cart/CartPage'

const page = () => {

  return (

    <main className={styles['container']}>
      <Suspense fallback={<Spinner size={25} color='primary' />}>
        <CartPage />  
      </Suspense>
    </main>

  )
}

export default page