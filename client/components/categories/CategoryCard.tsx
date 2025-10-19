'use client'

import React from 'react'
import styles from '../../styles/categories/categoryCard.module.scss'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CategoryCardProps{
    icon : string | StaticImageData,
    title : string,
    description : string,
    category : string
}

const CategoryCard = ({icon , title , description , category} : CategoryCardProps) => {

    const router = useRouter()

  return (

    <div onClick={() => router.push(`/categories/${category}`)} className={styles['card-container']}>
        <div className={styles['title-section']}>
            <Image className={styles['icon']} src={icon} alt='' />
            <span>{title}</span>
        </div>
        <div className={styles['about-section']}>
            <p>{description}</p>
        </div>
    </div>

  )
}

export default CategoryCard