'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/educator/educatorDetails.module.scss'
import { useParams } from 'next/navigation'
import { getUserApi } from '@/api/auth'
import { EducatorDetailsType } from '@/types/educatorDetailsType'
import { getTotalCoursesCountApi } from '@/api/course'
import { getTotalLearnersApi } from '@/api/enrollment'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import {
    Book as CourseIcon,
    Users as LearnersIcon
} from 'lucide-react'

const EducatorDetails = () => {

    const {id : educatorId} = useParams()
    const [educatorDetails , setEducatorDetails] = useState<EducatorDetailsType | null>(null)

    //function for getting educator
    const handleGetEducator = async () => {

        try {
            
            const [userResult , enrollmentResult , courseResult] = await Promise.all([
                getUserApi(educatorId as string),
                getTotalLearnersApi(educatorId as string),
                getTotalCoursesCountApi(educatorId as string)
            ])
            
            if(userResult?.success && enrollmentResult?.success && courseResult?.success){

                setEducatorDetails({
                    ...educatorDetails ,
                    _id : userResult?.user?._id,
                    fullname : userResult?.user?.fullname,
                    profilePic : userResult?.user?.profilePic,
                    bio : userResult?.user?.bio,
                    totalLearnersNumber : enrollmentResult?.totalLearners,
                    totalCoursesNumber : courseResult?.totalCoursesCount
                 })

            }

        } catch (error) {
            setEducatorDetails(null)
            console.log(error)
        }

    }
   
    useEffect(() => {
        handleGetEducator()
    } , [educatorId])

    if(!educatorDetails){
        return
    }

  return (

    <section className={styles['container']}>
        <div className={styles['main-section']}>
            <div className={styles['profile-pic-container']}>
                {
                    educatorDetails?.profilePic.url
                    ?
                    <Image className={styles['profile-pic']} src={educatorDetails?.profilePic.url} alt='' width={100} height={100} />
                    :
                    <Image className={styles['profile-pic']} src={assets.nullProfilePicIcon} alt='' width={100} height={100} />
                }
            </div>
            <div className={styles['details-container']}>
                <h1 className={styles['detail-name']}>{educatorDetails?.fullname}</h1>
                <p className={styles['detail-bio']}>{educatorDetails?.bio}</p>
                <div className={styles['other-details']}>
                    <div>
                        <CourseIcon
                            strokeWidth={1.2}
                            size={20}
                        /> 
                        <p>{educatorDetails?.totalCoursesNumber} Courses</p>
                    </div>
                    <div>
                        <LearnersIcon
                            strokeWidth={1.2}
                            size={20}
                        />
                        <p>{educatorDetails?.totalLearnersNumber} Learners</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

  )
}

export default EducatorDetails