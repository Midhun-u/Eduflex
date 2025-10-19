import React, { Suspense } from 'react'
import styles from '../../../styles/pages/myCourse.module.scss'
import MyCourseList from '../../../components/myCourse/MyCourseList'
import Spinner from '@/components/ui/Spinner'

const page = () => {

  return (

    <section className={styles['container']}>
      <span className={styles['title']}>My Courses</span>
      <Suspense fallback={<Spinner size={25} color='primary' />}>
        <MyCourseList />
      </Suspense>
    </section>

  )
}

export default page