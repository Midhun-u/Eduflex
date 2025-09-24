import React from 'react'
import style from '../../../styles/pages/sign.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Form from '@/components/layout/Form'

const page = () => {

    return (

        <main className={style['container']}>
            {/* image section */}
            <section className={style['image-section']}>
                <Image className={style['sign-image']} src={assets.signVector} alt='' />
            </section>
            {/* form section */}
            <section className={style['form-section']}>
                {/* sign form */}
                <Form submitButtonTitle='Sign In' signForm >
                    <h1>Sign In</h1>
                    <p>
                        Join our learning community to grow faster and smarter. Sign in for expert-led courses, interactive lessons, and a supportive space to help you thrive.
                    </p>
                </Form>
            </section>
        </main>

    )
}

export default page