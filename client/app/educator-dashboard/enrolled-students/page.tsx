import React, { Suspense } from 'react'
import styles from '../../../styles/pages/enrolledStudents.module.scss'
import EnrolledStudentList from '@/components/enrolledStudents/EnrolledStudentList'
import Spinner from '@/components/ui/Spinner'

const page = () => {

  return (

    <main className={styles['container']}>
      <h1 className={styles['title']}>Enrolled Students</h1>
      <Suspense fallback={<Spinner size={25} color='primary' />}>
        <EnrolledStudentList />
      </Suspense>
    </main>

  )
}

export default page