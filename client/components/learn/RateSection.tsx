'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/learn/rateSection.module.scss'
import Rating from './Rating'
import {
  SendHorizonal as SendIcon
} from 'lucide-react'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import { addRateApi, getUserRateApi, removeRateApi } from '@/api/rate'
import { RatingsType } from '@/types/ratingsType'
import { getUserApi } from '@/api/auth'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import {
  Trash as DeleteIcon
} from 'lucide-react'

const RateSection = () => {

  const { courseId } = useParams()
  const [rateNumber, setRateNumber] = useState<number>(1)
  const [comment, setComment] = useState<string>("")
  const [rate, setRate] = useState<RatingsType | null>(null)

  //function for rating course
  const handleRateCourse = async () => {

    try {

      if (rateNumber && courseId) {
        const rateResult = await addRateApi(courseId as string, rateNumber, comment)

        if (rateResult?.success && rateResult?.rateDetails?.userId) {

          const userResult = await getUserApi(rateResult?.rateDetails?.userId)
          if (userResult?.success) {

            const rateObj = {
              ...rateResult?.rateDetails,
              userDetails: userResult?.user
            }

            setRateNumber(1)
            setComment('')
            setRate(rateObj)
            toast.success("Rated this course")

          }
        }
      }

    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }

  }

  //function for getting user rate
  const handleGetUserRate = async () => {

    try {

      const rateResult = await getUserRateApi(courseId as string)
      if (rateResult?.success && rateResult?.rate?.userId) {

        const userDetails = await getUserApi(rateResult?.rate?.userId)
        if (userDetails?.success) {

          const rateObj = {
            ...rateResult?.rate,
            userDetails: userDetails?.user
          }

          setRate(rateObj)

        }

      }

    } catch (error) {
      console.log(error)
    }

  }

  //function for remove rate
  const handleRemoveRate = async () => {

    try {

      if (rate?.id) {

        const result = await removeRateApi(rate.id)

        if (result?.success) {
          setRate(null)
          toast.success("Rate is removed")
        }

      }

    } catch (error) {
      console.log(error)
      toast.error("Rate couldn't remove")
    }

  }

  useEffect(() => {
    handleGetUserRate()
  }, [])

  return (

    <section className={styles['container']}>
      {
        rate
          ?
          <div className={styles['user-rate-container']}>
            <div className={styles['user-profile']}>
              {
                rate?.userDetails.profilePic.url
                  ?
                  <Image className={styles['profile-pic']} src={rate?.userDetails.profilePic.url} width={40} height={40} alt='' />
                  :
                  <Image className={styles['profile-pic']} src={assets.nullProfilePicIcon} width={40} height={40} alt='' />
              }
            </div>
            <div className={styles['rate-details']}>
              <div className={styles['user-details']}>
                <span>{rate?.userDetails.fullname}</span>
                <div className={styles['rate-icons-container']}>
                  {
                    Array(rate.rate).fill(0).map((_, index) => (
                      <Image key={index} src={assets.ratingIcon} width={15} height={15} alt='' />
                    ))
                  }
                </div>
                <DeleteIcon
                  onClick={() => handleRemoveRate()}
                  className={styles['delete-icon']}
                  size={20}
                />
              </div>
              <p className={styles['rate-comment']}>
                {rate.comment}
              </p>
            </div>
          </div>
          :
          <>
            <h1 className={styles['title']}>Rate this course</h1>
            <Rating
              rateNumber={rateNumber}
              setRateNumber={setRateNumber}
            />
            <div className={styles['rate-input-container']}>
              <textarea
                className={styles['rate-comment-input']}
                placeholder='Enter a comment'
                onChange={(event) => setComment(event.target.value)}
                value={comment}
              />
              <Button onClick={() => handleRateCourse()} type='button' className='rate-send-button'>
                <SendIcon color='#fff' strokeWidth={1.2} />
                <p>Send</p>
              </Button>
            </div>
          </>
      }
    </section>

  )
}

export default RateSection