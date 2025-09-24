import React from 'react'
import styles from '../../../../../styles/pages/learn.module.scss'
import LearnPage from '@/components/learn/LearnPage'
import RatingSection from '@/components/learn/RateSection'

const page = () => {

  return (

    <main className={styles['container']}>
      <LearnPage />
      <RatingSection />
    </main>
    
  )
}

export default page