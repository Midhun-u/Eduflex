import React from 'react'
import style from '../../../styles/pages/login.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Form from '@/components/layout/Form'

const page = () => {

  return (

    <main className={style['container']}>
      {/* image section */}
      <section className={style['image-section']}>
        <Image className={style['login-image']} src={assets.loginVector} alt='' />
      </section>
      {/* form section */}
      <section className={style['form-section']}>
        <Form signForm={false} submitButtonTitle='Login'>
          <h1>Login</h1>
          <p>Welcome to Eduflex</p>
        </Form>
      </section>
    </main>
  )

}

export default page