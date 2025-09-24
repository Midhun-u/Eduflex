'use client'

import React from 'react'
import styles from '../../styles/layout/notFound.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Button from '../ui/Button'

const NotFound = () => {

  return (

    <div className={styles['container']}>
        <Image className={styles['icon']} src={assets.notFoundIcon} alt='' />
        <h1>No Results Found</h1>
        <p>We couldn't find any results</p>
        <Button onClick={() => window.location.reload()} title='Try again' className='refresh-button' type='button' />
    </div>
     
  )
}

export default NotFound