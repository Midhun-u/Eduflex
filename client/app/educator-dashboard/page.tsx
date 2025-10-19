import React, { Suspense } from 'react'
import styles from '../../styles/educator-dashboard/educator-dashboard.module.scss'
import EducatorCourseDetails from '@/components/educator-dashboard/EducatorCourseDetails'
import Spinner from '@/components/ui/Spinner'
import LatestEnrollments from '@/components/educator-dashboard/LatestEnrollments'

const page = () => {

  return (
    
      <section className={styles['container']}>
        <Suspense fallback={<Spinner size={25} color='primary' />}>
          <EducatorCourseDetails /> 
          <LatestEnrollments />
        </Suspense>
      </section>

  )
}

export default page