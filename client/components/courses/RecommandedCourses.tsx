import React, { useEffect, useState } from 'react'
import styles from '../../styles/courses/recommandedCourses.module.scss'
import { getRecommandedCoursesApi } from '@/api/course'
import { CourseType } from '@/types/courseType'
import CourseCard from './CourseCard'

interface RecommandedCoursesProps{
  courseId : string,
  courseCategory : string
}

const RecommandedCourses = ({courseId , courseCategory} : RecommandedCoursesProps) => {

  const [recommandedCourses , setRecommandedCourses] = useState<CourseType[]>([])

  //function for fetching recommanded courses
  const handleFetchRecommandedCourses = async () => {

    try {
      
      const result = await getRecommandedCoursesApi(courseId , courseCategory)
      
      if(result?.success){
        setRecommandedCourses(result?.recommandedCourses)
      }

    } catch (error) {
      console.log(error)
      setRecommandedCourses([])
    }

  }

  useEffect(() => {
    handleFetchRecommandedCourses()
  } , [courseCategory])

  if(!recommandedCourses.length){
    return
  }
    
  return (
    
    <section className={styles['container']}>
        <div className={styles['title-section']}>
            <h1>Recommanded Courses</h1>
            <p>Find your next learning adventure</p>
        </div>
        <div className={styles['course-list']}>
          {
            recommandedCourses.map((course) => (
              <CourseCard 
                key={course?.id}
                id={course?.id}
                thumbnail={course?.thumbnail.url}
                title={course?.title}
                educatorName={course?.educator.fullname}
                price={course?.price}
                averageRatings={4.5}
                totalRatings={422292}
              />
            ))
          }
        </div>
    </section>

  )
}

export default RecommandedCourses