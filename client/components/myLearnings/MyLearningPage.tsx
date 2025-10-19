'use client'

import React, { useEffect, useState } from 'react'
import LearningDetails from './LearningDetails'
import LearningCourseList from './LearningCourseList'
import { getEnrollmentDetailsApi } from '@/api/enrollment'
import { getCourseDetailsApi } from '@/api/course'
import { EnrolledCourseType } from '@/types/enrolledCourseType'
import NotFound from '../layout/NotFound'

const MyLearningPage = () => {

    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseType[]>([])
    const [enrollmentDetails , setEnrollmentDetails] = useState<{completedCoursesNumber : number , enrolledCoursesNumber : number , totalPrice : number}>({
        completedCoursesNumber : 0,
        enrolledCoursesNumber : 0,
        totalPrice : 0
    })
    const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })

    //function for getting enrolledCourse details
    const handleGetEnrolledCourseDetails = async () => {

        try {

            const enrollResult = await getEnrollmentDetailsApi()

            if (enrollResult?.success) {

                if (enrollResult?.enrolledCoursesNumber || enrollResult?.completedCoursesNumber || enrollResult?.totalPrice) {
                    setEnrollmentDetails({...enrollmentDetails , 
                        enrolledCoursesNumber : enrollResult?.enrolledCoursesNumber,
                        completedCoursesNumber : enrollResult?.completedCoursesNumber ,
                        totalPrice : enrollResult?.totalPrice
                    })
                    setPagination({ ...pagination, totalCount: enrollResult.enrolledCoursesNumber || 0 })

                }

                const courseListItems = await Promise.all(enrollResult?.enrolledCourses.map(async (enrolledCourse: { _id: string, courseId: string, userId: string }) => {

                    const courseResult = await getCourseDetailsApi(enrolledCourse.courseId, ['title', 'thumbnail', 'educator' , 'chapters'])

                    if (courseResult?.success) {
                        return {
                            ...enrolledCourse,
                            courseDetails: courseResult?.courseDetails
                        }
                    }

                }) || [])

                setEnrolledCourses(courseListItems)

            }


        } catch (error) {
            console.log(error)
            setEnrolledCourses([])
        }

    }

    useEffect(() => {
        handleGetEnrolledCourseDetails()
    }, [])

    if(enrolledCourses.length <= 0) return <NotFound />

    return (

        <>
            <LearningDetails
                enrolledCourseNumber={enrollmentDetails.enrolledCoursesNumber}
                completedCourseNumber={enrollmentDetails.completedCoursesNumber}
                totalPrice={enrollmentDetails.totalPrice}
            />
            <LearningCourseList
                courseList={enrolledCourses}
            />
        </>

    )
}

export default MyLearningPage