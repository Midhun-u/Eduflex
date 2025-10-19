import React from 'react'
import styles from '../../../styles/pages/categories.module.scss'
import { categories } from '@/utils/category'
import CategoryCard from '@/components/categories/CategoryCard'

const page = () => {

    return (

        <main className={styles['container']}>
            <section className={styles['title-container']}>
                <h1>Categories</h1>
                <p>A category section showcases services like Web Development and App Development, helping visitors quickly identify what you offer and navigate to the service that best fits their needs.</p>
            </section>
            <div className={styles['category-list-container']}>
                {
                    categories.map((category, index) => (

                        <CategoryCard
                            key={index}
                            icon={category.icon}
                            title={category.title}
                            description={category.about}
                            category={category.category}
                        />

                    ))
                }
            </div>

        </main>

    )
}

export default page