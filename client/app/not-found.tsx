import React from 'react'
import styles from './../styles/pages/notFound.module.scss'
import NotFoundComponent from '@/components/layout/NotFound'

const NotFound = () => {
    
  return (

    <main className={styles['container']}>
        <NotFoundComponent />
    </main>

  )
}

export default NotFound