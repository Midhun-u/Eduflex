"use client"

import React, { useEffect, useId, useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import style from '../../styles/pages/verify-email.module.scss'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { sendOtpApi, signApi, verifyOtpApi } from '@/api/auth'
import { authRequest, authFailed, authSuccess } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    Lock as OtpIcon
} from 'lucide-react'

const OtpSection = () => {


    const otpId = useId()
    const router = useRouter()
    const [otpInput, setOtpInput] = useState<string>('')
    const dispatch = useAppDispatch()
    const [count, setCount] = useState<number>(60)
    const [resendOtp, setResendOtp] = useState<boolean>(true)
    const { error } = useAppSelector(state => state.authReducer)

    //function for sending otp
    const sendOtp = async () => {

        try {
            const userDetails: { fullname: string, email: string, password: string } = JSON.parse(localStorage.getItem("userDetails") as string)

            if (!userDetails?.email) {
                router.push("/sign")
                return
            }

            const result: { success: boolean, message: string } = await sendOtpApi(userDetails.email)

            if (result.success) {
                toast.success("We have send an OTP to your email")
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    //function for verifying otp
    const verifyOtp = async () => {

        dispatch(authRequest())

        if (!otpInput) {
            toast.error("Enter OTP")
        }


        try {

            const result: { success: boolean, message: string } = await verifyOtpApi(otpInput)

            if (result.success) {
                const userDetails: { fullname: string, email: string, password: string } = JSON.parse(localStorage.getItem("userDetails") as string)

                if (!userDetails) {
                    router.push("/sign")
                    dispatch(authFailed({}))
                    return
                }

                const result: { success: boolean, message: string, authToken: string } = await signApi(userDetails.fullname, userDetails.email, userDetails.password)
                if (result) {
                    toast.success(result.message)
                    dispatch(authSuccess({ authToken: result.authToken, message: result.message }))
                    localStorage.removeItem("userDetails")
                    router.push("/")
                }
            }

        } catch (err: any) {
            console.log(err.response.data)

            if (err?.response) {
                dispatch(authFailed({ error: err.response.data.error }))
                toast.error(error?.error)
                return
            }

            toast.error("Something went wrong")
            return
        }

    }

    useEffect(() => {

        const userDetails = JSON.parse(localStorage.getItem("userDetails") as string)

        if (!userDetails?.email) {
            router.push("/sign")
            return
        }

        sendOtp()

    }, [])

    useEffect(() => {

        let timer: ReturnType<typeof setInterval> | undefined = undefined

        if (count > 0 && !resendOtp) {
            timer = setInterval(() => {
                setCount(count => count - 1)
            }, 1000)
        } else if (count === 0) {
            setResendOtp(true)
        }

        return () => clearInterval(timer)

    }, [resendOtp, count])

    return (

        <>
            <div className={style['otp-input']}>
                <label htmlFor={otpId}>Enter OTP</label>
                <div className={style['input-section']}>
                    <OtpIcon
                        className={style['otp-icon']}
                        strokeWidth={1.5}
                    />
                    <Input onChange={(event) => setOtpInput(event.target.value)} type='text' className='otp-input' id={otpId} placeholder='Enter OTP' />
                </div>
            </div>
            <Button onClick={() => verifyOtp()} title='Verify' className='otp-submit-button' type='button' disable={false} />
            <Button onClick={() => router.push('/sign')} title='Back To Sign' className='sign-navigation' type='button' disable={false} />
            <p className={style['resend-otp']}>

                {
                    resendOtp
                        ?
                        <>
                            Don't receive OTP ?
                            <span onClick={() => {
                                sendOtp()
                                setResendOtp(false)
                            }}>Resend OTP</span>
                        </>
                        :
                        <>
                            Resend OTP in <span>{count}</span> seconds
                        </>
                }
            </p>
        </>

    )
}

export default OtpSection