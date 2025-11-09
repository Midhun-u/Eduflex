'use client'

import React, { ReactNode, useEffect, useId, useRef, useState } from 'react'
import styles from '../../styles/settings/profileScreen.module.scss'
import { updateUserApi } from '@/api/auth'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import {
    Mail as EmailIcon,
    Shield as VerifiedIcon,
    Calendar as DateIcon,
    ChevronLeft as BackIcon,
    CameraIcon
} from 'lucide-react'
import { convertFormatDate } from '@/utils/convertDate'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'

interface ProfileScreenProps {
    setScreen: React.Dispatch<React.SetStateAction<ReactNode>>
}

const ProfileScreen = ({ setScreen }: ProfileScreenProps) => {

    const [formData, setFormData] = useState<{
        fullname: string,
        bio: string,
        profilePic: {
            url: string,
            publicId: string
        }
    }>({
        fullname: '',
        bio: '',
        profilePic: {
            url: '',
            publicId: ''
        }
    })
    const [editScreen, setEditScreen] = useState<boolean>(false)
    const fullnameId = useId()
    const bioId = useId()
    const imageRef = useRef<HTMLInputElement>(null)
    const { loading, user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    //function for storing iamge
    const handleStoreImage = (file: File) => {

        try {

            if (!file) return

            if (!file.type.includes("image")) {
                toast.error("Invalid image")
                return
            }

            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = async () => {
                setFormData({ ...formData, profilePic: { ...formData.profilePic, url: await fileReader.result as string } })
            }

        } catch (error) {
            console.log(error)
        }

    }

    //function for updating user data
    const handleUpdateUserData = async () => {

        try {

            if (!formData.fullname) {
                toast.error("Fullname must be provided")
                return
            }

            dispatch(authRequest())

            const result = await updateUserApi(formData.fullname, formData.bio, formData.profilePic)

            if (result?.success) {
                dispatch(authSuccess({ user: result?.updatedUser }))
                toast.success("Updated")
                setEditScreen(false)
            }

        } catch (error: any) {
            dispatch(authFailed({ error: error?.messagee }))
            console.log(error)
            toast.error("Couldn't update details")
        }

    }

    useEffect(() => {
        setFormData({
            ...formData,
            fullname: user?.fullname as string,
            bio: user?.bio as string,
            profilePic: {
                url: user?.profilePic.url as string,
                publicId: user?.profilePic.publicId as string
            }
        })
    }, [])

    if (!user) return

    return (

        <div className={styles['container']}>
            <div className={styles['title-container']}>
                <BackIcon
                    strokeWidth={1.5}
                    size={25}
                    className={styles['back-icon']}
                    onClick={() => setScreen(null)}
                />
                <h1 className={styles['title']}>Profile</h1>
            </div>
            <div onClick={() => imageRef.current?.click()} className={styles['profile-pic-container']}>
                {
                    formData.profilePic.url || user?.profilePic.url
                        ?
                        <Image className={editScreen ? styles['blur-profile-pic'] : styles['profile-pic']} src={formData.profilePic.url || user?.profilePic.url} width={100} height={100} alt='' />
                        :
                        <Image className={editScreen ? styles['blur-profile-pic'] : styles['profile-pic']} src={assets.nullProfilePicIcon} width={100} height={100} alt='' />
                }
                {
                    editScreen
                    &&
                    <>
                        <CameraIcon
                            strokeWidth={1.5}
                            className={styles['camera-icon']}
                        />
                        <Input
                            type='file'
                            hidden
                            ref={imageRef}
                            onChange={(event) => {
                                if (event.target.files) {
                                    handleStoreImage(event.target.files[0])
                                }
                            }}
                        />
                    </>
                }
            </div>
            <div className={styles['user-credentials']}>
                {
                    user?.fullname || editScreen
                        ?
                        <>
                            {
                                editScreen
                                    ?
                                    <label htmlFor={fullnameId}>Fullname</label>
                                    :
                                    <span>Fullname</span>

                            }
                            {
                                editScreen
                                    ?
                                    <Input
                                        className='edit-profile-input'
                                        type='text'
                                        placeholder='Enter full name'
                                        id={fullnameId}
                                        defaultValue={user?.fullname}
                                        onChange={(event) => setFormData({ ...formData, fullname: event.target.value })}
                                    />
                                    :
                                    <p>{user?.fullname}</p>

                            }
                        </>
                        :
                        null
                }
            </div>
            <div className={styles['user-credentials']}>
                {
                    user?.bio || editScreen
                        ?
                        <>
                            {
                                editScreen
                                    ?
                                    <label htmlFor={bioId}>Bio</label>
                                    :
                                    <span>Bio</span>

                            }
                            {
                                editScreen
                                    ?
                                    <textarea onChange={(event) => setFormData({ ...formData, bio: event.target.value })} defaultValue={user?.bio} placeholder='Enter bio' className={styles['bio-input']} id={bioId} />
                                    :
                                    <p>{user?.bio}</p>
                            }
                        </>
                        :
                        null
                }
            </div>
            {
                !editScreen
                    ?
                    <div className={styles['user-info-container']}>
                        <h1>Informations</h1>
                        <div className={styles['user-info']}>
                            <EmailIcon
                                strokeWidth={1.5}
                                size={23}
                                className={styles['icon']}
                            />
                            <div>
                                <p>Email</p>
                                <span>{user?.email}</span>
                            </div>
                        </div>
                        <div className={styles['user-info']}>
                            <DateIcon
                                size={25}
                                strokeWidth={1.5}
                                className={styles['icon']}
                            />
                            <div>
                                <p>Joined on</p>
                                <span>{convertFormatDate(user?.createdAt as string)}</span>
                            </div>
                        </div>
                        <div className={styles['user-info']}>
                            <VerifiedIcon
                                strokeWidth={1.5}
                                size={25}
                                className={styles['icon']}
                            />
                            <div>
                                <p>Account status</p>
                                <span>Verified</span>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles['button-container']}>
                {
                    editScreen
                        ?
                        <>
                            <Button
                                onClick={() => handleUpdateUserData()}
                                title='Save changes'
                                className='save-button'
                                type='button'
                                loading={loading}
                                loadingColor='white'
                            />
                            <Button
                                title='Cancel'
                                className='cancel-button'
                                type='button'
                                onClick={() => setEditScreen(false)}
                            />
                        </>
                        :
                        <Button
                            title='Edit Profile'
                            className='profile-edit-button'
                            type='button'
                            onClick={() => setEditScreen(true)}
                        />

                }
            </div>
        </div>

    )
}

export default ProfileScreen