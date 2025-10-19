import React, { useEffect, useState } from 'react'
import styles from '../../styles/courses/recommandedCourses.module.scss'
import { getRecommandedCoursesApi } from '@/api/course'
import CourseCard from './CourseCard'
import { getTotalRatingsApi } from '@/api/rate'
import { RecommandedCourseType } from '@/types/recommentedCourseType'

interface RecommandedCoursesProps{
  courseId : string,
  courseCategory : string
}

const RecommandedCourses = ({courseId , courseCategory} : RecommandedCoursesProps) => {

  const [recommandedCourses , setRecommandedCourses] = useState<RecommandedCourseType[]>([])

  //function for fetching recommanded courses
  const handleFetchRecommandedCourses = async () => {

    try {
      
      const recommandedCourseResult = await getRecommandedCoursesApi(courseId , courseCategory)

      if(recommandedCourseResult?.recommandedCourses.length){

        const courses = await Promise.all(recommandedCourseResult?.recommandedCourses.map(async(recommandedCourse : RecommandedCourseType) => {
          
          const rateResult = await getTotalRatingsApi(recommandedCourse?.id)
          
          if(rateResult?.success){
            return {
              ...recommandedCourse,
              totalRatings : rateResult?.totalRatings,
              averageRatings : rateResult?.averageRatings
            }
          }

        }))

        setRecommandedCourses(courses)

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
                averageRatings={course?.totalRatings}
                totalRatings={course?.averageRatings}
              />
            ))
          }
        </div>
    </section>

  )
}

export default RecommandedCourses