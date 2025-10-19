"use client"

import React, { FormEvent, ReactNode, useId } from 'react'
import Input from '../ui/Input'
import style from '../../styles/layout/form.module.scss'
import PasswordInput from '../ui/PasswordInput'
import SubmitSection from './SubmitSection'
import GoogleAuth from './GoogleAuth'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { authFailed, authRequest, authSuccess } from '../../store/authSlice'
import { checkEmailApi, loginApi } from '@/api/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
    UserIcon,
    Mail as EmailIcon,
    Lock as PasswordIcon,
    ArrowRight as NavIcon
} from 'lucide-react'

interface FormProps {
    submitButtonTitle: string,
    children?: ReactNode,
    signForm: boolean
}

const Form = ({ submitButtonTitle, children, signForm }: FormProps) => {

    const fullnameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const dispatch = useAppDispatch()
    const { message } = useAppSelector(state => state.authReducer)
    const router = useRouter()
    const passwordPlaceholder = signForm ? "Create new password" : "Enter your password"

    //submit form
    const submitForm = async (event: FormEvent) => {

        dispatch(authRequest())

        event.preventDefault()

        try {

            const formData = new FormData(event.currentTarget as HTMLFormElement)
            const fullname = formData.get('fullname') as string
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (!emailRegex.test(email)) {
                toast.error("Enter a valid email")
                dispatch(authFailed({}))
                return
            }

            if (signForm) {


                const result: { success: Boolean, message: string } = await checkEmailApi(email) //check email

                if (result.success) {

                    if (password.length < 6) {
                        toast.error("Password must 6 letters or above")
                        dispatch(authFailed({}))
                        return
                    }

                    localStorage.setItem('userDetails', JSON.stringify({ fullname: fullname, email: email, password: password }))
                    dispatch(authSuccess({}))
                    router.push("/verify-email")

                }

            } else {

                const result: { success: true, message: string } = await loginApi(email, password)

                if (result.success) {
                    dispatch(authSuccess({ message: result.message }))
                    toast.success(message)
                    router.push("/")
                }

            }


        } catch (err: any) {
            console.log(err)

            if (err?.response) {
                dispatch(authFailed({ error: err.response.data }))
                toast.error(err.response.data.error)
                return
            }

            toast.error('Something went wrong')
            return
        }

    }

    return (

        <>
            <form onSubmit={submitForm} className={style['form']}>
                {
                    children
                    &&
                    children
                }
                {/* form input */}
                <div className={style['form-input']}>
                    {
                        signForm
                            &&
                            <>
                                <label htmlFor={fullnameId}>Fullname</label>
                                <div>
                                    <UserIcon
                                        className={style['form-input-icon']}
                                        strokeWidth={1.5}
                                    />
                                    <Input name='fullname' type='text' className='form-input' placeholder='Enter your fullname' id={fullnameId} />
                                </div>
                            </>
                    }
                </div>
                <div className={style['form-input']}>
                    <label htmlFor={emailId}>Email address</label>
                    <div>
                        <EmailIcon
                            className={style['form-input-icon']}
                            strokeWidth={1.5}
                        />
                        <Input name='email' type='email' className='form-input' placeholder='Enter your email address' id={emailId} />
                    </div>
                </div>
                <div className={style['form-input']}>
                    <label htmlFor={passwordId}>Password</label>
                    <div>
                        <PasswordIcon
                            className={style['form-input-icon']}
                            strokeWidth={1.5}
                        />
                        <PasswordInput className='form-input' id={passwordId} placeholder={passwordPlaceholder} />
                    </div>
                </div>
                {/* submit section */}
                <div className={style['form-submit-section']}>
                    <SubmitSection signForm={signForm} title={submitButtonTitle} />
                </div>
                {/* google authentication */}
                <div className={style['google-section']}>
                    <GoogleAuth signForm={signForm} buttonTitle={signForm ? "Sign With Google" : "Login With Google"} />
                </div>
                <div className={style['nav-container']}>
                    <span>
                        {
                            signForm
                                ?
                                <>
                                    Already have an account ?
                                </>
                                :
                                <>
                                    Don't have an account ?
                                </>
                        }
                    </span>
                    <Link className={style['nav-link']} href={signForm ? "/login" : "/sign"}>
                        {signForm ? "Login" : "Sign"}
                        <NavIcon
                            strokeWidth={1.5}
                            className={style['nav-icon']}
                        />
                    </Link>
                </div>
            </form>
        </>

    )
}

export default Form