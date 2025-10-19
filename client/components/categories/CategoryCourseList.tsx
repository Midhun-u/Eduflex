'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CourseListType } from '@/types/courseType'
import { categories, CategoryType } from '@/utils/category'
import styles from '../../styles/categories/categoryCourseList.module.scss'
import { getCategoryCoursesApi, getCourseDetailsApi } from '@/api/course'
import NotFound from '../layout/NotFound'
import CourseCard from '../courses/CourseCard'
import Button from '../ui/Button'
import { getTopEnrollmentsApi } from '@/api/enrollment'
import { getTotalRatingsApi } from '@/api/rate'

const CategoryCourseList = () => {

    const { category } = useParams()
    const [courseList, setCourseList] = useState<CourseListType[]>([])
    const [categoryDetails, setCategoryDetails] = useState<CategoryType>()
    const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })

    //function for getting category details
    const handleGetCategoryDetails = () => {

        const filteredCategory = categories.find(categoryDetail => categoryDetail.category === category)
        setCategoryDetails(filteredCategory)

    }

    //function for fetching course based on category
    const handleFetchCourses = async () => {

        try {

            if (category === "popular") {

                const topEnrollmentResult = await getTopEnrollmentsApi()
                setPagination({...pagination , totalCount : topEnrollmentResult?.totalCount})
                
                if(topEnrollmentResult?.success){

                    const topEnrollmentCourses = await Promise.all(topEnrollmentResult?.topEnrollments.map(async (topEnrollment : {_id : string}) => {

                        const courseResult = await getCourseDetailsApi(topEnrollment?._id , ['id' , 'thumbnail' , 'title' , 'price' , 'educator'])
                        const rateResult = await getTotalRatingsApi(topEnrollment?._id)

                        if(courseResult?.success && rateResult?.success){
                            return {
                                ...topEnrollment,
                                ...courseResult?.courseDetails,
                                totalRatings : rateResult?.totalRatings,
                                averageRatings : rateResult?.averageRatings
                            }
                        }

                    }) || [])

                    setCourseList((preCourses) => {
                        return pagination.page !== 1 && preCourses.length ? [...preCourses , ...topEnrollmentCourses] : [...topEnrollmentCourses]
                    })
                    setPagination({...pagination , page : 1 , totalCount : 0})

                }

            } else {

                const result = await getCategoryCoursesApi(category as string, pagination.page, pagination.limit)
                if (result?.success) {
                    setCourseList((preCourses) => {
                        return pagination.page !== 1 && preCourses.length ? [...preCourses, ...result?.courses] : [...result?.courses]
                    })
                    setPagination({ ...pagination, totalCount: result?.totalCount })
                }

            }

        } catch (error) {
            console.log(error)
           setCourseList([])
        }

    }

    useEffect(() => {
        handleGetCategoryDetails()
        handleFetchCourses()
    }, [category, pagination.page])

    return (

        <section className={styles['container']}>
            {
                courseList.length
                    ?
                    <>
                        <div className={styles['title-section']}>
                            <h1>{categoryDetails?.title}</h1>
                            <p>{categoryDetails?.about}</p>
                        </div>
                        <div className={styles['list']}>
                            {
                                courseList.map((course) => (
                                    <CourseCard
                                        key={course?.id}
                                        id={course?.id}
                                        thumbnail={course?.thumbnail.url}
                                        educatorName={course?.educator.fullname}
                                        title={course?.title}
                                        averageRatings={course?.averageRatings}
                                        totalRatings={course?.totalRatings}
                                        price={course.price}
                                    />
                                ))
                            }
                        </div>
                        {
                            courseList.length < pagination.totalCount
                                ?
                                <div style={{ marginTop: "20px" }}>
                                    <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
                                </div>
                                :
                                null
                        }
                    </>
                    :
                    <div className={styles['not-found']}>
                        <NotFound />
                    </div>
            }
        </section>

    )
}

export default CategoryCourseList