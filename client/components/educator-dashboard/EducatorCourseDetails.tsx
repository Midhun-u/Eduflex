'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/educator-dashboard/educatorCourseDetails.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { getTotalCoursesCountApi } from '@/api/course'
import { getTotalEarningsApi, getTotalLearnersApi } from '@/api/enrollment'
import { useAppSelector } from '@/store/hooks'

const EducatorCourseDetails = () => {

    const {user} = useAppSelector(state => state.authReducer)
    const [educatorCourseDetails , setEducatorCourseDetails] = useState<{
        totalCourseNumber : number,
        totalLearners : number,
        totalEarnings : number
    }>({totalCourseNumber : 0 , totalEarnings : 0 , totalLearners : 0})

    //function for getting educator course details
    const handleGetEducatorCourseDetails = async () => {

        try {

            if(!user){
                return
            }
            
            const [totalCourseCountResult , totalLearnersResult , totalEarningsResult] = await Promise.all([
                getTotalCoursesCountApi(user._id),
                getTotalLearnersApi(user._id),
                getTotalEarningsApi(),
            ])
            
            if(totalCourseCountResult?.success || totalLearnersResult?.success || totalEarningsResult?.success){
                setEducatorCourseDetails({
                    ...educatorCourseDetails , 
                    totalCourseNumber : totalCourseCountResult?.totalCoursesCount || 0,
                    totalLearners : totalLearnersResult?.totalLearners || 0,
                    totalEarnings : totalEarningsResult?.totalEarnings || 0
                })
            }

        } catch (error) {
            console.log(error)
            return
        }

    }

    useEffect(() =>  {
      handleGetEducatorCourseDetails()  
    } , [user])


  return (

    <div className={styles['details-section']}>
        <div className={styles['details-container']}>
            <div className={styles['courses-detail']}>
                <Image width={25} height={25} src={assets.totalNumberCourseIcon} alt='' />
                <div>
                    <span>{educatorCourseDetails.totalCourseNumber}</span>
                    <p>courses</p>
                </div>
            </div>
            <div className={styles['learners-detail']}>
                <Image width={25} height={25} src={assets.enrollIcon} alt='' />
                <div>
                    <span>{educatorCourseDetails.totalLearners}</span>
                    <p>Learners</p>
                </div>
            </div>
            <div className={styles['earnings-detail']}>
                <Image width={25} height={25} src={assets.earningsIcon} alt='' />
                <div>
                    <span>₹{educatorCourseDetails.totalEarnings}</span>
                    <p>Earnings</p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default EducatorCourseDetails