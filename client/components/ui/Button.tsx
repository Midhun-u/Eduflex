"use client"

import React, { ReactNode } from 'react'
import style from '../../styles/ui/button.module.scss'
import Spinner from './Spinner'

interface ButtonProps{
    className : string,
    title? : string,
    children? : ReactNode
    disable? : boolean,
    type : "submit" | "reset" | "button",
    onClick ? : () => void,
    loading ? : boolean,
    loadingColor ? : "primary" | "white" | "dark"
}

const Button = ({className , title , children , disable , type , onClick , loading , loadingColor} : ButtonProps) => {

  return (

    <button onClick={onClick} disabled={loading ? true : disable} type={type} className={style[`${className}`]}>
        {
          loading
          ?
          <Spinner size={15} color={loadingColor} />
          :
          <>
         {title}
            {
              
                children
                ?
                children
                :
                null
            }
          </>
        }
    </button>

  )
}

export default Button