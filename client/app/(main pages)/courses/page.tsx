import React, { Suspense } from 'react'
import styles from '../../../styles/pages/courses.module.scss'
import CoursesList from '@/components/courses/CourseList'
import Spinner from '@/components/ui/Spinner'

const page = () => {

  return (

    <main className={styles['container']}>
        <Suspense fallback={<Spinner size={25} color='primary' />}>
          <CoursesList />
        </Suspense>
    </main>

  )
}

export default page