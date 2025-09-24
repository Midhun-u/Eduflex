'use client'

import React, { FormEvent, ReactNode, useId, useState } from 'react'
import styles from '../../styles/settings/changePasswordScreen.module.scss'
import {
    MoveLeft as BackIcon,
    KeyRound as PasswordIcon,
    Eye as ShowPasswordIcon,
    EyeClosed as HidePasswordIcon
} from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { changePasswordApi } from '@/api/auth'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'

interface ChangePasswordScreenProps {
    setScreen: React.Dispatch<React.SetStateAction<ReactNode>>
}

const ChangePasswordScreen = ({ setScreen }: ChangePasswordScreenProps) => {

    const currentPasswordId = useId()
    const newPasswordId = useId()
    const confirmPasswordId = useId()
    const [showPassword, setShowPassword] = useState<{
        currentPassword: boolean,
        newPassword: boolean
    }>({
        currentPassword: false,
        newPassword: false
    })
    const [password , setPassword] = useState<{
        currentPassword : string,
        newPassword : string,
        confirmPassword : string
    }>({
        currentPassword : '',
        newPassword : '',
        confirmPassword : ''
    })
    const {loading} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    //function for changing password 
    const handleChangePassword = async (event : FormEvent) => {

        event.preventDefault()

        try {
            
            if(!password.currentPassword || !password.newPassword || !password.confirmPassword){
                toast.error("Fill the fields")
                return
            }

            if(password.newPassword.length < 6){
                toast.error("New password must be 6 letters or above")
                return
            }

            if(password.newPassword !== password.confirmPassword){
                toast.error("New password is not matching")
                return
            }

            dispatch(authRequest())
            const result = await changePasswordApi(password.currentPassword , password.newPassword)
           
            if(result?.success){
                dispatch(authSuccess({message : result?.message , user : result?.updatedUser}))
                toast.success(result?.message)
                return
            }

        } catch (error : any) {
            dispatch(authFailed({error : error?.message}))
            console.log(error)

            if(error?.response?.data){
                toast.error(error.response.data.message)
                return
            }
            toast.error("Couldn't change password")
        }

    } 

    return (

        <div className={styles['container']}>
            <div className={styles['title-container']}>
                <BackIcon
                    strokeWidth={1.5}
                    size={25}
                    className={styles['back-icon']}
                    onClick={() => setScreen(null)}
                />
                <h1 className={styles['title']}>Change password</h1>
            </div>
            <form onSubmit={handleChangePassword} className={styles['form']}>
                <div className={styles['form-input-container']}>
                    <label htmlFor={currentPasswordId}>Current Password</label>
                    <div className={styles['form-input']}>
                        <PasswordIcon
                            strokeWidth={1.1}
                            className={styles['form-input-icon']}
                        />
                        <Input
                            type={showPassword.currentPassword ? "text" : "password"}
                            className='change-password-input'
                            placeholder='Enter your current password'
                            onChange={(event) => setPassword({...password , currentPassword : event.target.value.trim()})}
                        />
                        {
                            showPassword.currentPassword
                                ?
                                <HidePasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, currentPassword: false })}
                                />
                                :
                                <ShowPasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, currentPassword: true })}
                                />
                        }
                    </div>
                </div>
                <div className={styles['form-input-container']}>
                    <label htmlFor={newPasswordId}>New Password</label>
                    <div className={styles['form-input']}>
                        <PasswordIcon
                            strokeWidth={1.1}
                            className={styles['form-input-icon']}
                        />
                        <Input
                            type={showPassword.newPassword ? "text" : "password"}
                            className='change-password-input'
                            placeholder='Enter new password'
                            onChange={(event) => setPassword({...password , newPassword : event.target.value.trim()})}
                        />
                        {
                            showPassword.newPassword
                                ?
                                <HidePasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, newPassword: false })}
                                />
                                :
                                <ShowPasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, newPassword: true })}
                                />
                        }
                    </div>
                </div>
                <div className={styles['form-input-container']}>
                    <label htmlFor={confirmPasswordId}>Confirm New Password</label>
                    <div className={styles['form-input']}>
                        <PasswordIcon
                            strokeWidth={1.1}
                            className={styles['form-input-icon']}
                        />
                        <Input
                            type={showPassword.newPassword ? "text" : "password"}
                            className='change-password-input'
                            placeholder='Confirm new password'
                            onChange={(event) => setPassword({...password , confirmPassword : event.target.value.trim()})}
                        />
                        {
                            showPassword.newPassword
                                ?
                                <HidePasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, newPassword: false })}
                                />
                                :
                                <ShowPasswordIcon
                                    strokeWidth={1.1}
                                    className={styles['password-icon']}
                                    onClick={() => setShowPassword({ ...showPassword, newPassword: true })}
                                />
                        }
                    </div>
                </div>
                <div className={styles['button-container']}>
                    <Button loading={loading} loadingColor='white' title='Change password' type='submit' className='save-button' />
                </div>
            </form>
        </div>

    )
}

export default ChangePasswordScreen