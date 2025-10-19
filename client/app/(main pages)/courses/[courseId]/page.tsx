import React, { Suspense } from 'react'
import styles from '../../../../styles/courses/courseDetails.module.scss'
import Spinner from '@/components/ui/Spinner'
import AllCourseDetails from '@/components/courses/AllCourseDetails'

const page = () => {

  return (

    <main className={styles['container']}>
        <Suspense fallback={<Spinner size={25} color='primary' />}>
          <AllCourseDetails />
        </Suspense> 
    </main>

  )
}

export default page