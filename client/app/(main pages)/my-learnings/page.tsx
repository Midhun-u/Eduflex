import React from 'react'
import styles from '../../../styles/pages/myLearnings.module.scss'
import MyLearningPage from '@/components/myLearnings/MyLearningPage'

const page = () => {

  return (

    <main className={styles['container']}>
        <h1 className={styles['title']}>My Learning Dashboard</h1>
        <p className={styles['sub-title']}>Continue your journey to mastery</p>
        <MyLearningPage />
    </main>

  )
}

export default page