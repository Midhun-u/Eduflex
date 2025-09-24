'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/courses/courseList.module.scss'
import SearchSection from './SearchSection'
import { getCoursesApi } from '@/api/course'
import CourseCard from './CourseCard'
import Button from '../ui/Button'
import { useAppSelector } from '@/store/hooks'
import { useDispatch } from 'react-redux'
import { courseFailed, courseRequest, courseSuccess } from '@/store/courseSlice'
import Spinner from '../ui/Spinner'


const CourseList = () => {

    const { courses, loading } = useAppSelector(state => state.courseReducer)
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })

    //function for fetching courses
    const handleFetchCourses = async () => {

        try {

            dispatch(courseRequest())

            const result = await getCoursesApi(pagination.page, pagination.limit, searchQuery)

            if (result?.courses?.length) {

                pagination.page !== 1 && courses.length ? dispatch(courseSuccess({ courses: [...courses, ...result?.courses] })) : dispatch(courseSuccess({ courses: [...result.courses] }))

                if (result?.totalCount) {
                    setPagination({ ...pagination, totalCount: result?.totalCount })
                }
            }

        } catch (error: any) {
            dispatch(courseFailed({ error: error.message }))
            console.log(error)

        }

    }

    useEffect(() => {

        handleFetchCourses()

    }, [pagination.page, searchQuery])

    return (

        <section className={styles['container']}>
            <SearchSection
                pagination={pagination}
                setPagination={setPagination}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className={styles['course-list-container']}>
                {
                    loading
                    &&
                    <Spinner color='primary' size={25} />

                }
                <div className={styles['course-list']}>
                    {
                        courses?.map((course) => (

                            <CourseCard
                                key={course?.id}
                                id={course?.id}
                                title={course?.title}
                                thumbnail={course?.thumbnail.url}
                                averageRatings={course?.averageRatings}
                                totalRatings={course?.totalRatings}
                                educatorName={course?.educator.fullname}
                                price={course?.price}
                            />

                        ))
                    }
                </div>
                {
                    courses?.length < pagination.totalCount && !loading
                    &&
                    <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
                }
            </div>
        </section>

    )
}

export default CourseList