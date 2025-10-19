import React from 'react'
import style from '../../styles/layout/footer.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { companyInfo, socialMedias } from '@/utils/footer'
import Link from 'next/link'

const Footer = () => {

  return (

    <footer className={style['footer-container']}>
      {/* section one */}
      <section className={style['footer-section-one']}>
        <Image className={style['footer-section-one-image']} src={assets.logoDarkWithLabel} alt='' />
        <p>
          We're always in search for talented and motivated
          people .<br /> Don't be shy for introduce yourself
        </p>
        <h4>Social Media</h4>
        <div className={style['social-media-link-container']}>
        {
          socialMedias.map((socialMedia , index) => (

                <Link key={index} className={style['social-media-link']} href={socialMedia.link}>
                  <Image className={style['social-media-image']} src={socialMedia.image} alt='' />
                </Link>
          ))
        }
        </div> 
      </section>
      {/* section two */}
      <section className={style['footer-section-two']}>
        <h3 className={style['footer-title']}>Company Info</h3>
        <div className={style['footer-links']}>
        {
          companyInfo.map((companyInfoDetail , index) => (

            <Link className={style['link']} key={index} href={companyInfoDetail.link}>
              {companyInfoDetail.title}
            </Link>

          ))
        }
        </div>
      </section>
      <section className={style['footer-last-section']}>
        &copy;2025 All rights reserved
      </section>
    </footer>

  )
}

export default Footer