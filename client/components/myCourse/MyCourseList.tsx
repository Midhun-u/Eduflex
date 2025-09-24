'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/myCourse/myCourseList.module.scss'
import { getEducatorCoursesApi } from '@/api/course'
import { EducatorCourseType } from '@/types/educatorCourseType'
import { getTotalEnrollmentsApi } from '@/api/enrollment'
import { getTotalRatingsApi } from '@/api/rate'
import Image from 'next/image'
import {
  EllipsisVertical as MenuIcon
} from 'lucide-react'
import Button from '../ui/Button'
import MenuSection from './MenuSection'
import { convertFormatDate } from '@/utils/convertDate'
import { useAppSelector } from '@/store/hooks'
import NotFound from '../layout/NotFound'

const MyCourseList = () => {

  const { user } = useAppSelector(state => state.authReducer)
  const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
    page: 1,
    limit: 10,
    totalCount: 0
  })
  const [educatorCourses, setEducatorCourses] = useState<EducatorCourseType[]>([])
  const [showMenuSection, setShowMenuSection] = useState<boolean>(false)
  const [mounted , setMounted] = useState(false)

  //function for getting educator courses
  const handleGetEducatorCourses = async () => {

    try {

      const courseResult = await getEducatorCoursesApi(user?._id as string, pagination.page, pagination.limit)

      if (courseResult?.success) {

        const courses = await Promise.all(

          courseResult?.educatorCourses?.map(async (educatorCourse: EducatorCourseType) => {

            const enrollmentResult = await getTotalEnrollmentsApi(educatorCourse?.id)
            const rateResult = await getTotalRatingsApi(educatorCourse?.id)

            if (enrollmentResult?.success && rateResult?.success) {
              return {
                ...educatorCourse,
                totalRatings: rateResult?.totalRatings || 0,
                averageRatings: rateResult?.averageRatings || 0,
                totalEnrollments: enrollmentResult?.totalEnrollments || 0
              }
            }

          }) || []
        )

        setEducatorCourses((preCourses) => {
          return pagination.page !== 1 && preCourses.length ? [...preCourses, ...courses] : [...courses]
        })

        setPagination({ ...pagination, totalCount: courseResult?.totalCount })

      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    setMounted(true)
  } , [])
  
  useEffect(() => {
    handleGetEducatorCourses()
  }, [pagination.page , user])
  
  if (!user || !mounted) return

  return (

    <section className={styles['container']}>
      {
        showMenuSection
          ?
          <MenuSection
            setShowMenuSection={setShowMenuSection}
          />
          :
          null
      }
      {
        educatorCourses.length
          ?
          <>
            <div className={styles['list-container']}>
              <div className={styles['title-container']}>
                <p>Thumbnail</p>
                <p>Title</p>
                <p>Earnings</p>
                <p>Enrollments</p>
                <p>Published On</p>
              </div>
              <div className={styles['course-details-container']}>
                {
                  educatorCourses.map((educatorCourse) => (

                    <div className={styles['details-container']} key={educatorCourse?.id}>
                      {
                        educatorCourse?.thumbnail?.url
                          ?
                          <Image className={styles['thumbnail']} src={educatorCourse?.thumbnail.url} width={100} height={50} alt='' />
                          :
                          null

                      }
                      <p>{educatorCourse?.title}</p>
                      <p>₹{educatorCourse?.price * educatorCourse?.totalEnrollments}</p>
                      <p>{educatorCourse?.totalEnrollments}</p>
                      <p>{convertFormatDate(educatorCourse?.createdAt)}</p>
                      <div className={styles['menu-icon-container']}>
                        <MenuIcon
                          size={20}
                          className={styles['menu-icon']}
                          onClick={() => {
                            setShowMenuSection(true)
                            sessionStorage.setItem("courseDetails", JSON.stringify({
                              id: educatorCourse?.id,
                              title: educatorCourse?.title,
                              description: educatorCourse?.description,
                              thumbnail: educatorCourse?.thumbnail,
                              price: educatorCourse?.price,
                              previewLink: educatorCourse?.previewLink
                            }))
                          }}
                        />
                      </div>
                    </div>

                  ))
                }
              </div>
              {
                educatorCourses.length < pagination.totalCount
                &&
                <div className={styles['button-container']}>
                  <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
                </div>
              }
            </div>
          </>
          :
          <NotFound />
      }

    </section>

  )
}

export default MyCourseList