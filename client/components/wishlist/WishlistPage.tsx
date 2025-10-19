'use client'

import React, { useEffect, useState } from 'react'
import WishlistList from './WishlistList'
import { toast } from 'react-toastify'
import { getWishlistApi } from '@/api/wishlist'
import { getCourseDetailsApi } from '@/api/course'
import { getTotalRatingsApi } from '@/api/rate'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { wishlistFailed, wishlistRequest, wishlistSuccess } from '@/store/wishlistSlice'

const WishlistPage = () => {

  const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>(
    {
      page: 1,
      limit: 10,
      totalCount: 0
    }
  )
  const { wishlistItems } = useAppSelector(state => state.wishlistReduer)
  const dispatch = useAppDispatch()

  //function for fetching wishlist
  const handleFetchWishlist = async (category?: string) => {

    try {

      dispatch(wishlistRequest())
      const wishlistResult = await getWishlistApi(pagination.page, pagination.limit, category)

      if (wishlistResult?.totalCount) {
        setPagination({ ...pagination, totalCount: wishlistResult?.totalCount })
      }


      if (wishlistResult?.success) {

        const wishlistCourses = await Promise.all(
          wishlistResult?.wishlist.map(async (wishlistItem: { _id: string, userId: string, courseId: string, category: string }) => {

            const courseResult = await getCourseDetailsApi(wishlistItem.courseId, ['title', 'thumbnail', 'price', 'educator'])
            const rateResult = await getTotalRatingsApi(wishlistItem?.courseId)

            if (courseResult?.success && rateResult?.success) {
              return {
                ...wishlistItem,
                courseDetails: {
                  ...courseResult?.courseDetails,
                  totalRatings: rateResult?.totalRatings,
                  averageRatings: rateResult?.averageRatings
                }
              }
            }

          }) || []
        )

        pagination.page !== 1 && wishlistItems.length ? dispatch(wishlistSuccess({ wishlistItems: [...wishlistItems, ...wishlistCourses] })) : dispatch(wishlistSuccess({ wishlistItems: [...wishlistCourses] }))
      }

    } catch (error: any) {
      dispatch(wishlistFailed({ error: error.message }))
      console.log(error)
      toast.error("Something went wrong")
    }

  }

  useEffect(() => {
    handleFetchWishlist()
  }, [pagination.page])

  return (

    <>
      <WishlistList
        pagination={pagination}
        setPagination={setPagination}
        handleFetchWishlist={handleFetchWishlist}
      />
    </>

  )
}

export default WishlistPage