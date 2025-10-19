'use client'

import React, { useEffect, useState } from 'react'
import CartList from './CartList'
import CartTotalPrice from './CartTotalPrice'
import { toast } from 'react-toastify'
import { deleteCartItemApi, getAllCartPriceApi, getCartListItemsApi } from '@/api/cart'
import { getCourseDetailsApi } from '@/api/course'
import { getTotalRatingsApi } from '@/api/rate'
import { getTotalEnrollmentsApi } from '@/api/enrollment'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { cartFailed, cartRequest, cartSuccess } from '@/store/cartSlice'

const CartPage = () => {

  const { cartItems , totalCartPrice} = useAppSelector(state => state.cartReducer)
  const dispatch = useAppDispatch()
  const [pagination, setPagination] = useState<{ page: number, limit: number, totalCount: number }>({
    page: 1,
    limit: 10,
    totalCount: 0
  })

  //function for getting cart items and total price
  const handleGetCartItems = async () => {

    try {

      dispatch(cartRequest())
      
      const [cartResult , cartTotalPriceResult] = await Promise.all([
        getCartListItemsApi(pagination.page, pagination.limit),
        getAllCartPriceApi()
      ])
     
      setPagination({ ...pagination, totalCount: cartResult?.totalCount })

      if (cartResult?.success && cartTotalPriceResult?.success) {

        const cartListCourses = await Promise.all(

          cartResult?.cartItems.map(async (cartItems: { _id: string, courseId: string, userId: string }) => {

            const courseResult = await getCourseDetailsApi(cartItems?.courseId, ['id', 'title', 'thumbnail', 'educator'])
            const rateResult = await getTotalRatingsApi(cartItems?.courseId)
            const enrollmentResult = await getTotalEnrollmentsApi(cartItems?.courseId)

            if (courseResult?.success && rateResult?.success && enrollmentResult?.success) {
              return {
                ...cartItems,
                cartItem: courseResult?.courseDetails,
                totalEnrollments: enrollmentResult?.totalEnrollments,
                averageRatings: rateResult?.averageRatings,
                totalRatings: rateResult?.totalRatings
              }
            }
          }) || []
        )

        pagination.page !== 1 && cartItems?.length ? dispatch(cartSuccess({cartItems : [...cartItems , ...cartListCourses] , totalCartPrice : cartTotalPriceResult?.totalCartPrice})) : dispatch(cartSuccess({cartItems : [...cartListCourses]  , totalCartPrice : cartTotalPriceResult?.totalCartPrice}))

      }

    } catch (error : any) {
      dispatch(cartFailed({error : error.message}))
      console.log(error)
    }

  }

  //function for deleting cart items
  const handleDeleteCartItem = async (cartItemId: string, cartItemPrice: number) => {

    try {

      const result = await deleteCartItemApi(cartItemId)

      if (result?.success) {

        const newCartItems = cartItems.filter(cartItem => cartItem._id !== cartItemId)
        dispatch(cartSuccess({cartItems : newCartItems , totalCartPrice : totalCartPrice - cartItemPrice}))
        setPagination({ ...pagination, totalCount: pagination.totalCount - 1 })
        

        toast.success(result?.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("Could not remove cart item")
    }

  }

  useEffect(() => {
    handleGetCartItems()
  }, [pagination.page])

  return (

    <>
      <CartList
        pagination={pagination}
        setPagination={setPagination}
        handleDeleteCartItem={handleDeleteCartItem}
      />
      <CartTotalPrice
      />
    </>
  )
}

export default CartPage