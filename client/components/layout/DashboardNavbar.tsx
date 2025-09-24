'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/layout/dashboardNavbar.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import { sidebarNavLinks } from '@/utils/sidebar'
import {useRouter , usePathname} from 'next/navigation'
import { toast } from 'react-toastify'
import { getAuthUserApi} from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'

const DashboardNavbar = () => {
 
    const router = useRouter()
    const pathname = usePathname()
    const [showNavbar , setShowNavbar] = useState<boolean>(false)
    const {user} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    //function for highlight navlink
    const activeNavlink = (route : string) : boolean => {

        const isActive = (route === '/educator-dashboard' && pathname === '/educator-dashboard') || (route !== '/educator-dashboard' && pathname === route)
        return isActive

    }

    //function for getting user
    const handleGetUser = async () => {


        try {
            
            dispatch(authRequest())
            const result = await getAuthUserApi()
            if(result?.success){
                dispatch(authSuccess({user : result?.user}))
            }

        } catch (error : any) {
            dispatch(authFailed({error : error.message}))
            toast.error("Something went wrong")
            console.log(error)
        }

    }

    useEffect(() => {
        handleGetUser()
    } , [])

  return (

    <>
        <header className={styles['header-container']}>
            {/* logo section */}
            <div className={styles['logo-section']}>
                <Image width={35} height={35} src={assets.logoDark} alt='logo' />
                <span>EDUFLEX</span>
            </div>
            {/* profile section */}
            <div className={styles['profile-section']}>
                {
                    user?.profilePic.url
                    ?
                    <Image className={styles['profile-image']} width={35} height={35} src={user.profilePic.url} alt='' />
                    :
                    <Image className={styles['profile-image']} width={35} height={35} src={assets.nullProfilePicIcon} alt='' />
                }
                <Image onClick={() => setShowNavbar(!showNavbar)} className={styles['menu-icon']} width={30} height={30} src={assets.moreIcon} alt='' />
            </div>
        </header> 
        <aside className={showNavbar ? styles['show-sidebar'] : styles['sidebar-container']}>
            {
                sidebarNavLinks.map((navlinks , index) => (

                    <nav 
                        onClick={() => {
                            router.push(`${navlinks.route}`)
                            setShowNavbar(false)
                        }} 
                        key={index} 
                        className={activeNavlink(navlinks.route) ? styles['active-navlink'] : styles['navlink']}
                        >
                        <Image width={25} height={25} src={navlinks.icon} alt='' />
                        <span>{navlinks.title}</span>
                    </nav>
                ))
            }
        </aside> 
    </>

  )
}

export default DashboardNavbar