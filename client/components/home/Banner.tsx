"use client"

import React from 'react'
import styles from '../../styles/home/banner.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'

const Banner = () => {

  return (
    <section className={styles['banner-carousel']}>
      <div className={styles['banner-card']}>
        <div className={styles['banner-section-one']}>
          <h1>
            Smart Learning <br />
          </h1>
          <h1 className={styles['banner-text']}>-Amazing</h1>
          <p>
            Welcome to the future of education! Our Learning Management System offers a seamless and interactive platform for students, educators, and institutions to connect, learn, and grow—anytime, anywhere.
          </p>
        </div>
        <div className={styles['banner-section-two']}>
          <Image className={styles['banner-background']} src={assets.bannerBackground} alt='' />
          <Image className={styles['banner-image']} src={assets.bannerImageOne} alt='' />
        </div>
      </div>
      <div className={styles['banner-card']}>
        <div className={styles['banner-section-one']}>
          <h1>
            One Platform <br /> Endless Learning
          </h1>
          <h1 className={styles['banner-text']}>-Amazing</h1>
          <p>
            Step into a world where learning never stops. Our LMS platform brings together powerful tools, intuitive design, and engaging content to help you master new skills, track your growth, and collaborate with peers and mentors.
          </p>
        </div>
        <div className={styles['banner-section-two']}>
          <Image className={styles['banner-background']} src={assets.bannerBackground} alt='' />
          <Image className={styles['banner-image']} src={assets.bannerImageTwo} alt='' />
        </div>
      </div>
    </section>
  )
}

export default Banner