'use client'

import React from 'react'
import styles from '../../styles/cart/cartList.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import CartCard from './CartCard'
import NotFound from '../layout/NotFound'
import Button from '../ui/Button'
import { useAppSelector } from '@/store/hooks'
import { Spinnaker } from 'next/font/google'
import Spinner from '../ui/Spinner'

interface CartListProps {
    handleDeleteCartItem: (cartItemId: string, cartItemPrice: number) => void,
    pagination: { page: number, limit: number, totalCount: number }
    setPagination: React.Dispatch<React.SetStateAction<{ page: number, limit: number, totalCount: number }>>
}

const CartList = ({ pagination, setPagination, handleDeleteCartItem }: CartListProps) => {

    const { cartItems , loading} = useAppSelector(state => state.cartReducer)

    return (
        <section className={styles['section-container']}>
            <div className={styles['title-container']}>
                <Image src={assets.activeCartIcon} alt='' width={25} height={25} />
                <h1>Cart</h1>
                <span>{cartItems.length} courses</span>
            </div>
            <div className={styles['list-container']}>
                {
                    cartItems.length
                        ?
                        cartItems.map((cartItem) => (

                            <CartCard
                                key={cartItem?._id}
                                id={cartItem?.cartItem.id}
                                cartItemId={cartItem._id}
                                thumbnail={cartItem?.cartItem.thumbnail.url}
                                title={cartItem?.cartItem.title}
                                educatorName={cartItem?.cartItem.educator.fullname}
                                enrollments={cartItem?.totalEnrollments || 0}
                                rate={cartItem?.averageRatings || 0}
                                price={cartItem?.cartItemPrice}
                                handleDeleteCartItem={handleDeleteCartItem}
                            />

                        ))
                        :
                        (
                            loading
                            ?
                            <Spinner color='primary' size={25} />
                            :
                            <NotFound />
                        )
            }
                {
                    cartItems.length < pagination.totalCount && cartItems.length
                    &&
                    <Button onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })} title='Load more' className='load-button' type='button' />
                }
            </div>
        </section>
    )
}

export default CartList