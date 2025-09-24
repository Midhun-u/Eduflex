"use client"

import React, { useState } from 'react'
import styles from '../../styles/layout/header.module.scss'
import Image, { StaticImageData } from 'next/image'
import { assets } from '@/public/assets/assets'
import { navLinks } from '@/utils/header'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  X as CloseIcon
} from 'lucide-react'


const Header = () => {

  const pathname = usePathname()
  const [showNavBar, setShowNavBar] = useState<boolean>(false)

  //function for checking active links
  const isActive = (route: string) => {
    const activeLink = (route === '/' && pathname === '/') || (route !== '/' && pathname.startsWith(route))
    return activeLink

  }

  return (

    <header className={styles['container']}>
      <nav className={styles['nav']}>
        {/* logo section */}
        <section className={styles['logo-section']}>
          <Image className={styles['logo']} src={assets.logoDark} alt='logo' />
        </section>
        {/* links section */}
        <section className={styles['links-section']}>
          {
            showNavBar
              ?
              <CloseIcon
                className={styles['close-menu-icon']}
                size={25}
                onClick={() => setShowNavBar(false)}
              />
              :
              <Image onClick={() => setShowNavBar(true)} className={styles['menu-icon']} src={assets.menuIcon} alt='' />
          }
          {
            navLinks.map((link, index) => (

              <Link
                key={index}
                className={isActive(link.route) ? styles['active-link'] : styles['link']}
                href={link.route}
              >
                {
                  link.icon
                    ?
                    (
                      isActive(link.route)
                        ?
                        <Image key={index} className={styles['link-icon']} src={link.activeIcon as StaticImageData} alt='' />
                        :
                        <Image key={index} className={styles['link-icon']} src={link.icon} alt='' />
                    )
                    :
                    link.title
                }
                {
                  !link.icon
                    ?
                    <div className={styles['active-link-line']}></div>
                    :
                    null

                }
              </Link>

            ))
          }
          <nav className={showNavBar ? styles['show-responsive-navbar'] : styles['responsive-navs']}>
            {
              navLinks.map((link, index) => (

                <Link onClick={() => setShowNavBar(false)} key={index} className={isActive(link.route) ? styles['responsive-active-link'] : styles['responsive-link']} href={link.route}>
                  {link.title}
                  <div className={styles['active-link-line']}></div>
                </Link>

              ))
            }
          </nav>
        </section>
      </nav>
    </header>

  )
}


export default Header