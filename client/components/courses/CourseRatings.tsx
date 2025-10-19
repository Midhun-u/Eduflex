'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/courses/courseRating.module.scss'
import { getRateCommentsApi } from '@/api/rate'
import { getUserApi } from '@/api/auth'
import { RatingsType } from '@/types/ratingsType'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Button from '../ui/Button'

interface CourseRatingsProps {
  courseId: string
}

const CourseRatings = ({ courseId }: CourseRatingsProps) => {

  const [ratings, setRatings] = useState<RatingsType[]>([])
  const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
    page: 1,
    limit: 10,
    totalCount: 0
  })

  //function for getting rate comments
  const handleGetRateComments = async () => {

    try {

      const rateResult = await getRateCommentsApi(courseId, pagination.page, pagination.limit)

      if (rateResult?.success) {

        const ratingsList = await Promise.all(

          rateResult?.rateComments.map(async (rate: { id: string, rate: number, userId: string, courseId: string }) => {

            const userResult = await getUserApi(rate.userId)

            if (userResult?.success) {

              return {
                ...rate,
                userDetails: userResult?.user
              }

            }

          })
          || [])

        setRatings((preRatings) => {
          return preRatings.length && pagination.page !== 1 ? [...preRatings, ...ratingsList] : [...ratingsList]
        })

        if (rateResult?.totalCount) {
          setPagination({ ...pagination, totalCount: rateResult.totalCount })
        }

      }

    } catch (error) {
      console.log(error)
      setRatings([])
    }

  }

  useEffect(() => {
    handleGetRateComments()
  }, [pagination.page])

  if (!courseId || !ratings.length) return

  return (

    <section className={styles['container']}>
      <div className={styles['section']}>
        <h1 className={styles['title']}>Ratings</h1>
      </div>
      <div className={styles['list']}>
        {
          ratings.map((rate) => (

            <li className={styles['item-container']} key={rate.id}>
              <div className={styles['profile-container']}>
                {
                  rate?.userDetails.profilePic.url
                    ?
                    <Image className={styles['profile-pic']} src={rate?.userDetails.profilePic.url} width={40} height={40} alt='' />
                    :
                    <Image className={styles['profile-pic']} src={assets.nullProfilePicIcon} width={40} height={40} alt='' />
                }
              </div>
              <div className={styles['details-container']}>
                <div className={styles['details']}>
                  <p>{rate.userDetails.fullname}</p>
                  <div>
                    {
                      Array(rate.rate).fill(0).map((_, index) => (
                        <Image key={index} src={assets.ratingIcon} width={13} height={13} alt='' />
                      ))
                    }
                  </div>
                </div>
                <p className={styles['comment']}>
                  {rate.comment}
                </p>
              </div>
            </li>

          ))
        }
      </div>
      {
        ratings.length < pagination.totalCount
        &&
        <div className={styles['button-container']}>
          <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
        </div>
      }
    </section>

  )
}

export default CourseRatings