import React from 'react'
import CourseForm from '@/components/addCourse/CourseForm'
import styles from '../../../styles/pages/addCourse.module.scss'

const page = () => {

  return (

    <section className={styles['container']}>
        <CourseForm />
    </section>

  )
}

export default page