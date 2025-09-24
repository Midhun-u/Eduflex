'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/courses/courseCard.module.scss'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { assets } from '@/public/assets/assets'

interface CourseCardProps {
    id: string,
    thumbnail: string | StaticImport,
    title: string,
    educatorName: string,
    totalRatings: string | number,
    averageRatings: string | number,
    price: string | number
}

const CourseCard = ({ id, thumbnail, title, educatorName, totalRatings, price, averageRatings }: CourseCardProps) => {

    const router = useRouter()

    return (

        <div onClick={() => router.push(`/courses/${id}`)} className={styles['card-container']}>
            {
                thumbnail
                &&
                <Image src={thumbnail} alt='' width={160} height={100} className={styles['card-thumbnail']} priority />
            }
            <h1 className={styles['card-title']}>{title}</h1>
            <p className={styles['educator-name']}>by {educatorName}</p>
            <div className={styles['rate-container']}>
                <p>{averageRatings || 0}</p>
                <Image src={assets.ratingIcon} width={15} height={15} alt='' />
                <p>({totalRatings || 0})</p>
            </div>
            <p className={styles['price']}>₹{price}</p>
        </div>

    )
}

export default CourseCard