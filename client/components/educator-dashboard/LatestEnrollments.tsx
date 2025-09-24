'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/educator-dashboard/latestEnrollments.module.scss'
import { getLatestEnrollmentsApi } from '@/api/enrollment'
import { getUserApi } from '@/api/auth'
import { getCourseDetailsApi } from '@/api/course'
import { EnrolledStudentsType } from '@/types/enrolledStudentType'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { convertFormatDate } from '@/utils/convertDate'

const LatestEnrollments = () => {

    const [latestEnrollments, setLatestEnrollments] = useState<EnrolledStudentsType[]>([])

    //function for fetching latest enrollments
    const handleFetchLatestEnrollments = async () => {

        try {

            const enrollmentResult = await getLatestEnrollmentsApi()

            if (enrollmentResult?.success) {

                const enrollments = await Promise.all(
                    enrollmentResult?.latestEnrollments?.map(async (latestEnrollment: { _id : string , courseEducatorId: string, userId: string, courseId: string , createdAt : string}) => {

                        const userResult = await getUserApi(latestEnrollment?.userId)
                        const courseResult = await getCourseDetailsApi(latestEnrollment?.courseId, ['title'])

                        if (userResult?.success) {
                            return {
                                _id : latestEnrollment?._id,
                                courseEducatorId: latestEnrollment?.courseEducatorId,
                                courseId: latestEnrollment?.courseId,
                                courseDetails: {...courseResult?.courseDetails},
                                user : {...userResult?.user},
                                createdAt : latestEnrollment?.createdAt
                            }
                        }

                    }) || []
                )

                setLatestEnrollments(enrollments)



            }

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleFetchLatestEnrollments()
    }, [])

    if(!latestEnrollments.length) return

    return (

        <section className={styles['container']}>
            <h1 className={styles['heading']}>Latest Enrollments</h1>
            <div className={styles['list-container']}>
                <div className={styles['title-container']}>
                    <p>Student Name</p>
                    <p>Course Title</p>
                    <p>Enrolled On</p>
                </div>
                {
                    latestEnrollments?.map((latestEnrollment) => (

                        <div key={latestEnrollment._id} className={styles['details-container']}>
                            <div className={styles['student-details']}>
                                {
                                    latestEnrollment?.user?.profilePic?.url
                                    ?
                                    <Image className={styles['profile-pic']} src={latestEnrollment.user.profilePic.url} alt='' width={40} height={40} />
                                    :
                                    <Image className={styles['profile-pic']} src={assets.nullProfilePicIcon} alt='' width={40} height={40} />
                                }
                                <p>{latestEnrollment?.user?.fullname}</p>
                            </div>
                            <p>{latestEnrollment?.courseDetails?.title}</p>
                            <p>{convertFormatDate(latestEnrollment?.createdAt)}</p>
                        </div>

                    ))
                }
            </div>
        </section>

    )
}

export default LatestEnrollments