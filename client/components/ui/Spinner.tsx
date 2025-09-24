"use client"

import React from 'react'
import style from '../../styles/ui/spinner.module.scss'

interface SpinnerProps{
    color : "primary" | "white" | "dark" | undefined,
    size : number
}

const Spinner = ({color , size} : SpinnerProps) => {
    return (
        <div className={style['spinner-container']}>
            <div style={{width : `${size}px` , height : `${size}px`}} className={style[`spinner-${color}`]}></div>
        </div>
    )
}

export default Spinner