'use client'

import React from 'react'
import ISO6391 from 'iso-639-1'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import styles from '../../styles/addCourse/courseForm.module.scss'

interface LanguageSelectorProps{
    setLanguage : React.Dispatch<React.SetStateAction<string | undefined>>
}

const LanguageSelector = ({setLanguage} : LanguageSelectorProps) => {

    const languages = ISO6391.getAllCodes().map(code => ({
        code : code,
        name : ISO6391.getName(code)
    }))

  return (

    <div 
        style={{position : 'relative' , display : "flex" , alignItems : "center"}}
    >
        <select onChange={(event) => setLanguage(event.target.value)} required className={styles['selector']} >
            <option value={''}>Select</option>
            {
                languages.map((lang , index) => (
                    <option key={index} value={lang.name}>{lang.name}</option>
                ))
            }
        </select>
        <Image className={styles['arrow-icon']} width={25} height={25} src={assets.arrowIcon} alt='' />
    </div>

  )
}

export default LanguageSelector