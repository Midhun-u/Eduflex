'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/enrolledStudents/enrolledStudentList.module.scss'
import { getEnrolledStudentsApi } from '@/api/enrollment'
import { getUserApi } from '@/api/auth'
import { getCourseDetailsApi } from '@/api/course'
import { EnrolledStudentsType } from '@/types/enrolledStudentType'
import NotFound from '../layout/NotFound'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { convertFormatDate } from '@/utils/convertDate'
import Button from '../ui/Button'

const EnrolledStudentList = () => {

    const [pagination, setPagination] = useState<{
        page: number,
        limit: number,
        totalCount: number
    }>({
        page: 1,
        limit: 10,
        totalCount: 0
    })
    const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudentsType[]>([])

    //function for getting enrolled students
    const handleGetEnrolledStudents = async () => {

        try {

            const enrollmentResult = await getEnrolledStudentsApi(pagination.page , pagination.limit)

            if (enrollmentResult?.success) {

                const enrolledStudents = await Promise.all(
                    enrollmentResult?.enrolledStudents.map(async (enrolledStudent: { courseEducatorId: string, userId: string, _id: string, courseId: string }) => {
                        const userResult = await getUserApi(enrolledStudent?.userId)
                        const courseResult = await getCourseDetailsApi(enrolledStudent?.courseId, ['title'])

                        return {
                            ...enrolledStudent,
                            user: userResult?.user,
                            courseDetails: courseResult?.courseDetails
                        }
                    }) || []

                )

                setEnrolledStudents(preStudents => {
                    return preStudents.length && pagination.page !== 1 ? [...preStudents, ...enrolledStudents] : [...enrolledStudents]
                })

                if(enrollmentResult?.totalCount){
                    setPagination({...pagination , totalCount : enrollmentResult.totalCount})
                }

            }

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        handleGetEnrolledStudents()
    }, [pagination.page])

    return (

        <section className={styles['list-container']}>
            {
                enrolledStudents.length
                    ?
                    <>
                        <div className={styles['list-item']}>
                            <div className={styles['title-section']}>
                                <p>Student Name</p>
                                <p>Course Title</p>
                                <p>Enrolled On</p>
                            </div>
                            <div className={styles['item-section']}>
                                {
                                    enrolledStudents.map((enrolledStudent) => (

                                        <div key={enrolledStudent?._id} className={styles['details-container']}>
                                            <div className={styles['student-details']}>
                                                {
                                                    enrolledStudent.user?.profilePic.url
                                                        ?
                                                        <Image className={styles['profile-pic']} src={enrolledStudent.user.profilePic.url} width={40} height={40} alt='' />
                                                        :
                                                        <Image className={styles['profile-pic']} src={assets.nullProfilePicIcon} width={40} height={40} alt='' />
                                                }
                                                <p>{enrolledStudent?.user.fullname}</p>
                                            </div>
                                            <p>{enrolledStudent?.courseDetails.title}</p>
                                            <p>{convertFormatDate(enrolledStudent?.createdAt)}</p>
                                        </div>

                                    ))
                                }
                            </div>
                            {
                                enrolledStudents.length < pagination.totalCount
                                &&
                                <div className={styles['button-container']}>
                                    <Button onClick={() => setPagination({...pagination , page : pagination.page + 1})} title='Load more' className='load-button' type='button' />
                                </div>
                            }
                        </div>
                    </>
                    :
                    <div className={styles['not-found']}>
                        <NotFound />
                    </div>
            }
        </section>

    )
}

export default EnrolledStudentList