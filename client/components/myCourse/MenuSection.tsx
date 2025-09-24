'use client'

import React, { ReactNode, useState } from 'react'
import styles from '../../styles/myCourse/menuSection.module.scss'
import {
    MoveLeftIcon,
    X as CloseIcon,
    SquarePen as EditIcon
} from 'lucide-react'
import EditCourseScreen from './EditCourseScreen'

interface MenuSectionProps{
    setShowMenuSection : React.Dispatch<React.SetStateAction<boolean>>
}

const MenuSection = ({setShowMenuSection} : MenuSectionProps) => {

    const [screen, setScreen] = useState<ReactNode>()

    //function for setting screen
    const handleSetScreen = (screenTitle: string) => {

        if(screenTitle === 'edit'){
            setScreen(
                <EditCourseScreen
                    setScreen={setScreen}
                />
            )
        }

    }

    return (

        <div className={styles['container']}>
            <div className={styles['menu-section']}>
                {
                    screen
                    &&
                    <MoveLeftIcon
                        size={25}
                        strokeWidth={1.5}
                        className={styles['back-icon']}
                        onClick={() => setScreen(null)}
                    />
                }
                <CloseIcon
                    size={25}
                    strokeWidth={1.5}
                    className={styles['close-icon']}
                    onClick={() => setShowMenuSection(false)}
                />
                <div className={styles['menu']}>
                    {
                        screen
                            ?
                            screen
                            :
                            <>
                                <div onClick={() => handleSetScreen("edit")} className={styles['menu-option']}>
                                    <EditIcon
                                        size={22}
                                        strokeWidth={1.5}
                                    />
                                    <p className={styles['option']}>Edit course</p>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>

    )
}

export default MenuSection