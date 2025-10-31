"use client"

import React, { useEffect, useState } from 'react'
import styles from '../../styles/home/topCourses.module.scss'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'
import CourseCard from '../courses/CourseCard'
import { getTopEnrollmentsApi } from '@/api/enrollment'
import { getCourseDetailsApi } from '@/api/course'
import { TopCouresType } from '@/types/topCourseType'
import { getTotalRatingsApi } from '@/api/rate'

const TopCourses = () => {

    const router = useRouter()
    const [topCourses , setTopCourses] = useState<TopCouresType[]>([])

    //function for getting top courses
    const handleGetTopCourses = async () => {

        try {
            
            const enrollmentResult = await getTopEnrollmentsApi()
            
            if(enrollmentResult?.success){

                const topCourseListItems = await Promise.all(enrollmentResult?.topEnrollments.map(async(topEnrollment : {_id : string , totalEnrollments : number}) => {

                    const courseResult = await getCourseDetailsApi(topEnrollment._id , [ 'title' , 'thumbnail' , 'price' , 'educator'])
                    const ratingsResult = await getTotalRatingsApi(topEnrollment?._id)
                  
                    if(courseResult?.success){
                        return {
                            ...topEnrollment,
                            courseDetails : {
                                ...courseResult?.courseDetails,
                                totalRatings : ratingsResult?.totalRatings,
                                averageRatings : ratingsResult?.averageRatings
                            },
                        }
                    }

                }) || [])

                setTopCourses(topCourseListItems)

            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleGetTopCourses()
    } , [])

    if(!topCourses.length) return
    console.log(topCourses)

    return (
        <section className={styles['course-section']}>
            <div className={styles['title-section']}>
                <h1>Explore Our Top Courses</h1>
            </div>
            <div className={styles['course-list']}>
                {
                    topCourses.map((topCourse) => (
                        <CourseCard 
                            key={topCourse?._id}
                            thumbnail={topCourse?.courseDetails.thumbnail.url}
                            id={topCourse?._id}
                            title={topCourse?.courseDetails?.title}
                            educatorName={topCourse?.courseDetails?.educator.fullname}
                            averageRatings={topCourse?.courseDetails?.averageRatings}
                            totalRatings={topCourse?.courseDetails?.totalRatings}
                            price={topCourse?.courseDetails?.price}
                        />
                    ))
                }
            </div>
            <Button onClick={() => router.push('/courses')} className='course-navigation-button' type='button' disable={false} title='See All Courses' />
        </section>
    )
}

export default TopCourses