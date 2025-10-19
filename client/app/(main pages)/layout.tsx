import Header from '@/components/layout/Header'
import React, { ReactNode } from 'react'

const Layout = ({children} : {children : ReactNode}) => {

  return (

    <>
        <Header />
        {children}
    </>

  )
}

export default Layout