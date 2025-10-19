'use client'

import React, { useEffect, useState } from 'react'
import CourseDetails from './CourseDetails'
import CourseRatings from './CourseRatings'
import RecommandedCourses from './RecommandedCourses'
import { CourseType } from '@/types/courseType'
import { getCourseDetailsApi } from '@/api/course'
import { useParams } from 'next/navigation'
import NotFound from '../layout/NotFound'

const AllCourseDetails = () => {

  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState<CourseType>()

  //function for fetching course details
  const handleFetchCourseDetails = async () => {

    try {

      const result = await getCourseDetailsApi(courseId as string)

      if (result?.success) {
        setCourseDetails(result?.courseDetails)
      }

    } catch (error) {
      console.log(error)
      setCourseDetails(undefined)
    }

  }

  useEffect(() => {

    handleFetchCourseDetails()

  }, [courseId])

  if (!courseDetails) <NotFound />

  return (

    <>
      <CourseDetails
        courseDetails={courseDetails as CourseType}
      />
      <CourseRatings
        courseId={courseId as string}
      />
      <RecommandedCourses
        courseId={courseId as string}
        courseCategory={courseDetails?.category as string}
      />
    </>

  )
}

export default AllCourseDetails