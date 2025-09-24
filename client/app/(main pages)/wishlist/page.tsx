import React from 'react'
import styles from '../../../styles/pages/wishlist.module.scss'
import WishlistPage from '@/components/wishlist/WishlistPage'

const page = () => {

  return (

    <main className={styles['container']}>
        <WishlistPage />
    </main>

  )
}

export default page