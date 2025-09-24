"use client"

import React, { Ref } from 'react'
import style from '../../styles/ui/input.module.scss'

interface InputProps {
  type : string,
  className? : string,
  id? : string,
  placeholder ? : string,
  onChange? : (event : React.ChangeEvent<HTMLInputElement>) => void,
  name ? : string,
  value ? : string | number,
  defaultValue? : string | number,
  ref? : Ref<HTMLInputElement> | undefined,
  hidden? : boolean,
  required? : boolean
}

const Input = ({type , className , id , placeholder , onChange , name , value , defaultValue , ref , hidden , required} : InputProps) => {

  return (

    <input 
      step={type === 'timer' ? '1' : undefined}
      defaultValue={defaultValue} 
      value={value} type={type} 
      required={required} 
      name={name} onChange={onChange} 
      className={style[`${className}`]} 
      id={id} 
      placeholder={placeholder} 
      ref={ref}
      hidden={hidden ? true : false}
    />

  )
}

export default Input