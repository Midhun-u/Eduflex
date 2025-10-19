"use client"

import React , {ChangeEvent, useState} from 'react'
import style from '../../styles/layout/form.module.scss'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Input from './Input'

interface PasswordInputProps{
  id : string,
  placeholder ? : string,
  className : string,
  onChange ? : (event : ChangeEvent<HTMLInputElement>) => void,
} 

const PasswordInput = ({id , onChange , placeholder} : PasswordInputProps) => {

    const [showPassword , setShowPassword] = useState<boolean>(false)

  return (

    <>
        {
            showPassword
            ?
            <Image onClick={() => setShowPassword(false)} className={style['hide-password-icon']} src={assets.hidePasswordIcon} alt='' />
            :
            <Image onClick={() => setShowPassword(true)} className={style['show-password-icon']} src={assets.showPasswordIcon} alt='' />

        }
        <Input onChange={onChange} name='password' type={`${showPassword ? "text" : "password"}`} className='form-input' placeholder={placeholder} id={id} />
    </>
  )
}

export default PasswordInput