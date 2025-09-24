import DashboardNavbar from '@/components/layout/DashboardNavbar'
import React, { ReactNode } from 'react'
import styles from '../../styles/educator-dashboard/layout.module.scss'

const Layout = ({children} : {children : ReactNode}) => {

  return (

    <main className={styles['container']}>
        <DashboardNavbar />
        {children}
    </main>

  )
}

export default Layout