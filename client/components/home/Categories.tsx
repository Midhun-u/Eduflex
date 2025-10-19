'use client'

import React from 'react'
import styles from '../../styles/home/categories.module.scss'
import { categories } from '@/utils/category'
import Link from 'next/link'
import CategoryCard from '../categories/CategoryCard'

const Categories = () => {

    return (

        <section className={styles['category-section']}>
            <h1 className={styles['category-section-title']}>Choice Favourite Course From </h1>
            <span className={styles['category-section-subtitle']}>Top Category</span>
            <div className={styles['category-container']}>
                {
                    categories.slice(0 , 5).map((category, index) => (

                        <CategoryCard
                            key={index}
                            title={category.title}
                            icon={category.icon}
                            description={category.about}
                            category={category.category}
                        />

                    ))
                }
            </div>
            <Link className={styles['category-navigation']} href={'/categories'}>
                See All Categories
            </Link>
        </section>
    )
}

export default Categories