'use client'

import React from 'react'
import styles from '../../styles/cart/cartCard.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { useRouter } from 'next/navigation'
import {
    UsersIcon as EnrollmentsIcon,
    Trash as DeleteIcon
}
    from 'lucide-react'

interface CartCardProps {
    id: string,
    cartItemId: string,
    thumbnail: string,
    title: string,
    educatorName: string,
    enrollments: number | string,
    rate: string | number,
    price: string | number,
    handleDeleteCartItem: (cartItemId: string, cartItemPrice: number) => void
}

const CartCard = ({ id, cartItemId, thumbnail, title, educatorName, enrollments, rate, price, handleDeleteCartItem }: CartCardProps) => {

    const router = useRouter()

    return (

        <div className={styles['card-container']}>
            <div className={styles['thumbnail-container']}>
                {
                    thumbnail
                    &&
                    <Image onClick={() => router.push(`/courses/${id}`)} className={styles['thumbnail']} src={thumbnail} alt='' width={80} height={50} />
                }
            </div>
            <div className={styles['details-container']}>
                <span className={styles['title']}>{title}</span>
                <p>by {educatorName}</p>
                <div className={styles['other-details']}>
                    <div className={styles['enrollments']}>
                        <EnrollmentsIcon
                            strokeWidth={1.3}
                            size={15}
                        />
                        <p>{enrollments}</p>
                    </div>
                    <div className={styles['rate']}>
                        <Image src={assets.ratingIcon} width={13} height={13} alt='' />
                        <p>{rate}</p>
                    </div>
                </div>
                <span className={styles['price']}>₹{price}</span>
            </div>
            <div className={styles['remove-container']}>
                <DeleteIcon
                    onClick={() => handleDeleteCartItem(cartItemId, typeof price === "string" ? parseInt(price) : price)}
                    className={styles['remove-icon']}
                    size={20}
                />
            </div>
        </div>

    )
}

export default CartCard