import React from 'react'
import style from '../../../styles/pages/verify-email.module.scss'
import OtpSection from '@/components/layout/OtpSection'

const page = () => {

  return (

    <main className={style['container']}>
        <section className={style['section']}>
            <h1>Verify Your Email</h1>
            <p>We have sent an OTP to your email . Please enter that OTP for verifying your email</p>
            <OtpSection />
        </section>
    </main>

  )
}

export default page