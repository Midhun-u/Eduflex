import React from 'react'
import styles from '../../styles/pages/home.module.scss'
import Banner from '@/components/home/Banner'
import TopCourses from '@/components/home/TopCourses'
import Categories from '@/components/home/Categories'
import BrowseCourse from '@/components/home/BrowseCourse'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Link from 'next/link'
import Questions from '@/components/home/Questions'

const Page = () => {

  return (

    <main className={styles['container']}>
      <Banner />
      <p className={styles['about']}>
        We are passionate about empowering learners Worldwide with high-quality , accessable & engaging education . Our mission offering a diverse range of courses.
      </p>
      <section className={styles['quality-section']}>
        <div className={styles['sections']}>
          <span>10+</span>
          <p>Years of eLearning  Education Experience</p>
        </div>
        <div className={styles['sections']}>
          <span>45K</span>
          <p>Students Entrolled in Couses</p>
        </div>
        <div className={styles['sections']}>
          <span>50+</span>
          <p>Experience Teacher's  service</p>
        </div>
      </section>
      <TopCourses />
      <Categories />
      <BrowseCourse />
      <section className={styles['carrier-section']}>
        <h1 className={styles['heading']}>What are you looking for ? </h1>
        <p className={styles['about']}>Our dynamic educational platform offers you the tools and
          resources to propel yourself towards a brighter future 
        </p>
        <div className={styles['carrier-options']}>
          <div className={styles['carrier-option']}>
            <Image className={styles['icon']} src={assets.teachIcon} alt='' />
            <h1>Do You Want To Teach Here ?</h1>
            <p>
              Out dynamic educational platform offers you the tools supportive community 
            </p>
            <Link className={styles['dashboard-link']} href={'/educator-dashboard'}>
              Get Started
            </Link>
          </div>
          <div className={styles['carrier-option']}>
            <Image className={styles['icon']} src={assets.learnIcon} alt='' />
            <h1>Do You Want To Learn Here ?</h1>
            <p>
              Out dynamic educational platform offers you the tools supportive community 
            </p>
            <Link className={styles['enrollment-link']} href={'/courses'}>
              Enroll
            </Link>
          </div>
        </div>
      </section>
      <Questions />
    </main>

  )
}

export default Page 