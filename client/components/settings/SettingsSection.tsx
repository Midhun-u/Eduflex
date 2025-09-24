'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import styles from '../../styles/settings/settingsSection.module.scss'
import {
    UserPen as ProfileIcon,
    LogOutIcon,
    LockIcon
} from 'lucide-react'
import ProfileScreen from './ProfileScreen'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAuthUserApi, logoutApi } from '@/api/auth'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import ChangePasswordScreen from './ChangePasswordScreen'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const SettingsSection = () => {

    const [screen, setScreen] = useState<ReactNode>(null)
    const { user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const router = useRouter()

    //function for setting screen
    const handleSetScreen = (screenName: string) => {

        switch (screenName) {

            case "profile":

                setScreen(
                    <ProfileScreen
                        setScreen={setScreen}
                    />
                )

                break

            case "changePassword":

                setScreen(
                    <ChangePasswordScreen
                        setScreen={setScreen}
                    />
                )

                break

            default:
                setScreen(null)
                break
        }

    }

    //function for fetching auth user
    const handleFetchAuthUser = async () => {

        try {

            dispatch(authRequest())
            const result = await getAuthUserApi()

            if (result?.success) {
                dispatch(authSuccess({ user: result?.user }))
            }

        } catch (error: any) {
            dispatch(authFailed({ error: error.message }))
            console.log(error)
        }

    }

    //function for logout
    const handleLogout = async () => {

        try {

            const result = await logoutApi()
            if (result?.success) {
                toast.success(result?.message)
                router.push("/login")
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }


    useEffect(() => {
        handleFetchAuthUser()

        const screenWidth = window.innerWidth

        if (screenWidth > 950) {
            handleSetScreen("profile")
        }
    }, [])


    return (

        <section className={styles['container']}>
            <div className={screen ? styles['hide-option-container'] : styles['option-container']}>
                <h1 className={styles['title']}>Settings</h1>
                <div onClick={() => handleSetScreen("profile")} className={styles[`option`]}>
                    <ProfileIcon
                        strokeWidth={1.5}
                        size={20}
                    />
                    <p>Profile</p>
                </div>
                {
                    user?.authType === "Email"
                    &&
                    <div onClick={() => handleSetScreen("changePassword")} className={styles['option']}>
                        <LockIcon
                            strokeWidth={1.5}
                            size={20}
                        />
                        <p>Change password</p>
                    </div>
                }
                <div onClick={() => handleLogout()} className={styles['option']}>
                    <LogOutIcon
                        size={20}
                        strokeWidth={1.5}
                    />
                    <p>Logout</p>
                </div>
            </div>
            <div className={screen ? styles['show-screen-container'] : styles['screen-container']}>
                {
                    screen
                }
            </div>
        </section>

    )
}

export default SettingsSection