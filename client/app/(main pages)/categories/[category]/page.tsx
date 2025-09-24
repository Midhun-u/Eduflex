import React from 'react'
import styles from '../../../../styles/pages/categories.module.scss'
import CategoryCourseList from '@/components/categories/CategoryCourseList'

const page = () => {

  return (

    <main className={styles['container']}>
      <CategoryCourseList />
    </main>

  )
}

export default page