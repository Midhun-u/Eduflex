'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/educator/educatorCourses.module.scss'
import { CourseListType } from '@/types/courseType'
import { getEducatorCoursesApi } from '@/api/course'
import { useParams } from 'next/navigation'
import { getTotalRatingsApi } from '@/api/rate'
import CourseCard from '../courses/CourseCard'
import Button from '../ui/Button'
import NotFound from '../layout/NotFound'

const EducatorCourses = () => {

    const { id: educatorId } = useParams()
    const [educatorCourses, setEducatorCourses] = useState<CourseListType[]>([])
    const [pagination, setPagination] = useState<{
        page: number,
        limit: number,
        totalCount: number
    }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })

    //function for fetching educator courses
    const handleFetchEducatorCourses = async () => {
        
        if(!educatorId) return

        try {

            const courseResult = await getEducatorCoursesApi(educatorId as string, pagination.page, pagination.limit)
            console.log(courseResult)

            if (courseResult?.success) {

                const courseDetails = await Promise.all(courseResult?.educatorCourses?.map(async (educatorCourse: CourseListType) => {

                    const rateResult = await getTotalRatingsApi(educatorCourse?.id)

                    if (rateResult?.success) {
                        return {
                            ...educatorCourse,
                            totalRatings: rateResult?.totalRatings,
                            averageRatings: rateResult?.averageRatings
                        }
                    }

                }) || [])

                setEducatorCourses((preCourses) => {
                    return preCourses.length && pagination.page !== 1 ? [...preCourses, ...courseDetails] : [...courseDetails]
                })

                setPagination({ ...pagination, totalCount: courseResult?.totalCount })

            }


        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        handleFetchEducatorCourses()
    }, [pagination.page])

    if (!educatorCourses.length) return <NotFound />

    return (

        <section className={styles['container']}>
            <h1 className={styles['title']}>Courses</h1>
            <div className={styles['list']}>
                {
                    educatorCourses.map((educatorCourse) => (

                        <CourseCard
                            key={educatorCourse?.id}
                            id={educatorCourse?.id}
                            title={educatorCourse?.title}
                            thumbnail={educatorCourse?.thumbnail?.url}
                            educatorName={educatorCourse?.educator?.fullname}
                            totalRatings={educatorCourse?.totalRatings}
                            averageRatings={educatorCourse?.averageRatings}
                            price={educatorCourse?.price}
                        />

                    ))
                }
            </div>
            {
                educatorCourses?.length < pagination.totalCount
                &&
                <div className={styles['button-container']}>
                    <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
                </div>
            }
        </section>

    )
}

export default EducatorCourses