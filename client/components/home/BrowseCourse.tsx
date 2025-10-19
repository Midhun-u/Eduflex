"use client"

import React from 'react'
import styles from '../../styles/home/browseCourse.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

const BrowseCourse = () => {

    const router = useRouter()

  return (
    <section className={styles['container']}>
        {/* section one */}
        <div className={styles['section-one']}>
            <Image className={styles['image']} src={assets.browseCourseImage} alt='' />
            <div className={styles['courses-number']}>
                <Image className={styles['course-icon']} src={assets.courseIcon} alt='' />
                <div>
                    <p>
                        Number of Courses Sold Out
                    </p>
                    <strong>1.5K</strong>
                </div>
            </div>
        </div>
        {/* section two */}
        <div className={styles['section-two']}>
            <h1 className={styles['heading']}>
                Growth Skill With <span className={styles['primary-text']}>Eduflex</span> <br />Academy & Accelerate To Your Better Future
            </h1>
            <p className={styles['para-one']}>
                Embrace the transformative journey of learning with Eduflex knowledge become a catelyst for progress .  
            </p>
            <p className={styles['para-two']}>
                Our dynamic educational platform offers you the tools and resources to propel yourself towards a brighter future With expert guidance & a supportive community . 
            </p>
            <Button onClick={() => router.push('/courses')} title='Browse Courses' type='button' disable={false} className='browse-courses-button' />
        </div>
    </section>
  )
}

export default BrowseCourse