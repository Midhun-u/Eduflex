import { categories } from '@/utils/category'
import React from 'react'
import styles from '../../styles/addCourse/courseForm.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'

interface CategorySelectorProps{
    setCategory : React.Dispatch<React.SetStateAction<string | undefined>>
}

const CategorySelector = ({setCategory} : CategorySelectorProps) => {

    return (

        <div
            style={{ position: 'relative', display: "flex", alignItems: "center" }}
        >
            <select onChange={(event) => setCategory(event.target.value)} required className={styles['selector']}>
                <option value={''}>Select</option>
                {
                    categories.map((category, index) => (

                            category.title !== 'Popular'
                            &&
                            <option key={index} value={category.category}>{category.title}</option>
                    ))
                }
            </select>
            <Image width={25} height={25} src={assets.arrowIcon} alt='' className={styles['arrow-icon']} />
        </div>

    )
}

export default CategorySelector