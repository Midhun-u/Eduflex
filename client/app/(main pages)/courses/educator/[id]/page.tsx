import React from 'react'
import styles from '../../../../../styles/pages/educator.module.scss'
import EducatorDetails from '@/components/educator/EducatorDetails'
import EducatorCourses from '@/components/educator/EducatorCourses'

const page = () => {

  return (

    <main className={styles['container']}>
        <EducatorDetails />
        <EducatorCourses />
    </main>

  )
}

export default page