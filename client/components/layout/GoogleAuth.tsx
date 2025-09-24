"use client"

import React from 'react'
import style from '../../styles/layout/form.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Button from '../ui/Button'
import {signInWithPopup} from 'firebase/auth'
import {auth , provider} from '../../api/firebase'
import { toast } from 'react-toastify'
import { googleLoginApi, googleSignApi } from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import {useRouter} from 'next/navigation'

interface GoogleAuthProps{
    buttonTitle : string,
    signForm : boolean
}

const GoogleAuth = ({buttonTitle , signForm}:GoogleAuthProps) => {

  const dispatch = useAppDispatch()
  const {loading} = useAppSelector(state => state.authReducer)
  const router = useRouter()

  //function for google auth
  const googleAuth = async () => {

    dispatch(authRequest())

    try {
      const {user} = await signInWithPopup(auth , provider)
     
      if(signForm){
        
        const result : {success : true , message : string , authToken : string} = await googleSignApi(user.displayName as string , user.email as string , user.photoURL as string)
        
        if(result.success){
          dispatch(authSuccess({authToken : result.authToken , message : result.message}))
          toast.success(result?.message)
          localStorage.removeItem("userDetails")
          router.push("/")
          
        }
      }else{

        const result : {success : boolean , message : string , authToken : string} = await googleLoginApi(user.email as string)
        
        if(result.success){
          await dispatch(authSuccess({message : result?.message , authToken : result?.authToken}))
          router.push("/")
        }

      }

    } catch (err : any) {

      console.log(err)

      if(err?.response?.data){
        await dispatch(authFailed({error : err?.response.data}))
        toast.error(err?.response.data.error)
        return
      }

      dispatch(authFailed({error : err.message}))
      toast.error("Something went wrong")
    } 
  }

  return (

    <div className={style['google-auth-container']}>
        {/* section one */}
        <div className={style['section-one']}>
            <div className={style['left-line']}></div>
            <span>OR</span>
            <div className={style['right-line']}></div>
        </div>
        {/* button section*/}
        <Button loadingColor='primary' loading={loading} onClick={() => googleAuth()} type='button' disable={false} className='google-button'>
          <Image className={style['google-icon']} src={assets.googleIcon} alt='' />
          <span className={style['google-button-title']}>{buttonTitle}</span>
        </Button>
    </div>

  )
}

export default GoogleAuth