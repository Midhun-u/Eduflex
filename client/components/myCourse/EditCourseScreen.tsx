'use client'

import React, { ReactNode, useEffect, useId, useRef, useState } from 'react'
import styles from '../../styles/myCourse/editCourseScreen.module.scss'
import Input from '../ui/Input'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import {
    X as RemoveIcon
} from 'lucide-react'
import Iframe from '../ui/Iframe'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { updateCourseDetailsApi } from '@/api/course'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { courseFailed, courseRequest, courseSuccess } from '@/store/courseSlice'

interface EditCourseScreen {
    setScreen: React.Dispatch<React.SetStateAction<ReactNode>>
}

const EditCourseScreen = ({ setScreen }: EditCourseScreen) => {

    const [formData, setFormData] = useState<{
        id: string
        title: string,
        description: string,
        price: number,
        thumbnail: {
            url: string,
            publicId: string
        },
        previewLink: string
    }>({
        id: '',
        title: '',
        description: '',
        price: 0,
        thumbnail: {
            url: '',
            publicId: ''
        },
        previewLink: ''
    })
    const [previewLink, setPreviewLink] = useState<string>('')
    const titleId = useId()
    const descriptionId = useId()
    const previewId = useId()
    const priceId = useId()
    const imageRef = useRef<HTMLInputElement>(null)
    const { loading } = useAppSelector(state => state.courseReducer)
    const dispatch = useAppDispatch()

    //function for getting course details
    const handleGetCourseDetails = async () => {

        const courseDetails = sessionStorage.getItem("courseDetails")
        if (!courseDetails) {
            setScreen(null)
            return
        }
        setFormData(JSON.parse(courseDetails))

    }

    //function for storing thumbnail
    const handleStoreImage = (file: File) => {

        if (!file.type.includes("image")) {
            toast.error("Invalid file")
            return
        }

        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = async () => {
            setFormData({ ...formData, thumbnail: { ...formData.thumbnail, url: fileReader.result as string } })
        }

    }

    //function for storing preview link
    const handleStorePreviewLink = () => {

        const youtubeLinkRegex = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/

        if (!youtubeLinkRegex.test(previewLink)) {
            toast.error("Invalid link")
            return
        }

        setFormData({ ...formData, previewLink: previewLink })

    }

    //function for updating course
    const handleUpdateCourse = async () => {

        try {

            dispatch(courseRequest())

            if (
                !formData.title ||
                !formData.description ||
                !formData.previewLink ||
                !formData.thumbnail.url ||
                !formData.thumbnail.publicId ||
                !formData.price
            ) {
                toast.error("Fill the fields")
                return
            }

            const result = await updateCourseDetailsApi(formData.id, formData.title, formData.description, formData.thumbnail, formData.price, formData.previewLink)
            if (result?.success) {
                dispatch(courseSuccess({ message: result?.message }))
                toast.success(result?.message)
                window.location.reload()
            }

        } catch (error: any) {
            dispatch(courseFailed({ error: error.message }))
            console.log(error)
            toast.error("Couldn't edit course")
        }

    }

    useEffect(() => {
        handleGetCourseDetails()
    }, [])

    return (

        <div className={styles['container']}>
            <div className={styles['form-input']}>
                <label htmlFor={titleId}>Course Title</label>
                <Input onChange={(event) => setFormData({ ...formData, title: event.target.value })} id={titleId} type='text' defaultValue={formData.title} className='edit-form-input' placeholder='Enter course title' />
            </div>
            <div className={styles['form-input']}>
                <label htmlFor={descriptionId}>Course Description</label>
                <textarea onChange={(event) => setFormData({ ...formData, description: event.target.value })} id={descriptionId} defaultValue={formData.description} className={styles['description-input']} placeholder='Enter course description' />
            </div>
            <div className={styles['thumbnail-container']}>
                {
                    formData.thumbnail.url
                        ?
                        <Image className={styles['thumbnail']} src={formData.thumbnail.url} width={200} height={100} alt='' />
                        :
                        <div className={styles['file-upload-container']} onClick={() => imageRef.current?.click()}>
                            <Image src={assets.uploadFileIcon} width={50} height={50} alt='' />
                            <p>Upload Course Thumbnail</p>
                            <Input ref={imageRef} hidden type='file' onChange={(event) => {
                                if (event.target.files) {
                                    handleStoreImage(event.target.files[0])
                                }
                            }} />
                        </div>
                }
                {
                    formData.thumbnail.url
                    &&
                    <RemoveIcon
                        size={25}
                        strokeWidth={1.5}
                        className={styles['remove-icon']}
                        onClick={() => setFormData({ ...formData, thumbnail: { ...formData.thumbnail, url: '' } })}
                    />
                }
            </div>
            <div className={styles['preview-container']}>
                <label htmlFor={previewId}>Preview</label>
                <div className={formData.previewLink ? styles['preview-expand'] : styles['preview']}>
                    {
                        formData.previewLink
                            ?
                            <>
                                <Iframe className={styles['youtube-player']} youtubePreviewLink={formData.previewLink} />
                                <Button onClick={() => setFormData({ ...formData, previewLink: '' })} title='Remove preview' type='button' className='remove-preview-button' />
                            </>
                            :
                            <div className={styles['preview-input-container']}>
                                <Input onChange={(event) => setPreviewLink(event.target.value)} type='text' placeholder='Enter youtube embed link' className='edit-form-input' />
                                <Button onClick={() => handleStorePreviewLink()} title='Add preview' type='button' className='add-preview-button' />
                            </div>
                    }
                </div>
            </div>
            <div className={styles['price-input']}>
                <label htmlFor={priceId}>Price</label>
                <Input
                    className='edit-form-input'
                    type='number'
                    value={formData.price}
                    onChange={(event) => setFormData({ ...formData, price: parseInt(event.target.value) })}
                    placeholder='Enter course price'
                />
            </div>
            <Button loading={loading} loadingColor='white' onClick={() => handleUpdateCourse()} title='Edit course' type='button' className='edit-course-button' />
        </div>

    )
}

export default EditCourseScreen