'use client'

import React, { FormEvent, useEffect, useId, useRef, useState } from 'react'
import styles from '../../styles/addCourse/courseForm.module.scss'
import Input from '../ui/Input'
import LanguageSelector from './LanguageSelector'
import CategorySelector from './CategorySelector'
import Image from 'next/image'
import { assets } from '@/public/assets/assets'
import Keypoints from './Keypoints'
import AddChapter from './AddChapter'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { uploadCourseApi } from '@/api/course'
import AddPreview from './AddPreview'
import YoutubePlayer from './YoutubePlayer'
import { useAppDispatch } from '@/store/hooks'
import { useAppSelector } from '@/store/hooks'
import { courseRequest, courseSuccess, courseFailed } from '../../store/courseSlice'
import { useRouter } from 'next/navigation'
import { authFailed, authRequest, authSuccess } from '@/store/authSlice'
import { getAuthUserApi } from '@/api/auth'
import { ChapterType } from '@/types/chapterType'
import { CourseFormInputType } from '@/types/courseFormInputType'

const CourseForm = () => {

    const router = useRouter()
    const courseTitleId = useId()
    const descriptionId = useId()
    const priceId = useId()
    const chapterId = useId()
    const [keypoints, setKeypoinst] = useState<string[]>([])
    const [chapters, setChapters] = useState<Array<ChapterType>>([])
    const [language, setLanguage] = useState<string | undefined>()
    const [category, setCategory] = useState<string>()
    const [thumbnail, setThumbnail] = useState<Base64URLString | null>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [addPreviewSection, setAddPreviewSection] = useState<boolean>(false)
    const [previewLink, setPreviewLink] = useState<string>('')
    const [formInput, setFormInput] = useState<CourseFormInputType>({
        title: '',
        description: '',
        chapterNumber: null,
        price: null
    })
    const imageRef = useRef<HTMLInputElement>(null)
    const { loading } = useAppSelector(state => state.courseReducer)
    const { user } = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    //function for fetching user
    const handleGetUser = async () => {

        try {

            dispatch(authRequest())

            const result = await getAuthUserApi()

            if (result?.success) {
                dispatch(authSuccess({ user: result?.user }))
            }

        } catch (error: any) {
            dispatch(authFailed({ error: error?.message }))
            console.log(error)
        }

    }

    //function for storing image
    const handleStoreImage = async (image: File) => {

        try {

            if (!image.type.includes('image')) {
                toast.error("Invalid image")
                return
            }

            if (image) {

                const fileReader = new FileReader()
                fileReader.readAsDataURL(image)
                fileReader.onload = async () => {

                    const base64 = await fileReader.result
                    setThumbnail(base64 as string)

                }
                const objectURL = URL.createObjectURL(image)
                setPreviewImage(objectURL)

            }

        } catch (error) {
            setThumbnail(null)
            console.log(error)
        }

    }

    //function for uploading course
    const handleUploadCourse = async (event: FormEvent) => {

        event?.preventDefault()

        if (
            !formInput.title ||
            !formInput.description ||
            !formInput.price ||
            parseInt(formInput.chapterNumber as string) <= 0 ||
            !language ||
            !category ||
            !previewLink
        ) {
            toast.error("Fill all input")
            return
        }

        if (
            keypoints.length <= 0 || chapters.length <= 0
        ) {
            toast.error("Keypoints and chapters must be provided")
            return
        }

        if (!user) return

        try {

            dispatch(courseRequest())

            const result = await uploadCourseApi({
                title: formInput.title,
                description: formInput.description,
                language: language,
                category: category,
                thumbnail: thumbnail as string,
                previewLink: previewLink.trim(),
                chapters: chapters,
                keypoints: keypoints,
                chapterNumber: formInput.chapterNumber as string,
                price: formInput.price,
                educatorFullname: user?.fullname,
                educatorProfilePic: user?.profilePic
            })

            if (result.success) {
                dispatch(courseSuccess({ message: result.message }))
                toast.success(result?.message)
                router.push("/educator-dashboard/my-courses")
            }



        } catch (error:any) {
            console.log(error)
            dispatch(courseFailed({ error: error.message }))
            toast.error('Upload failed')
        }

    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (

        <form onSubmit={handleUploadCourse} className={styles['form']}>
            <div className={styles['title']}>
                <label htmlFor={courseTitleId}>Course Title</label>
                <Input required onChange={(event) => setFormInput({ ...formInput, title: event.target.value })} id={courseTitleId} type='text' className='course-form-input' placeholder='Enter course title' />
            </div>
            <div className={styles['description']}>
                <label htmlFor={descriptionId}>Course Description</label>
                <textarea onChange={(event) => setFormInput({ ...formInput, description: event.target.value })} required className={styles['description-input']} placeholder='Enter course description' />
            </div>
            <div className={styles['language']}>
                <label>Language</label>
                <LanguageSelector setLanguage={setLanguage} />
            </div>
            <div className={styles['category']}>
                <label>Category</label>
                <CategorySelector setCategory={setCategory} />
            </div>
            <div className={styles['thumbnail']}>
                <label>Course Thumbnail</label>
                <div style={previewImage ? { border: "none" } : {}} onClick={() => imageRef.current?.click()} className={styles['thumbnail-container']}>
                    <Input required onChange={(event) => {

                        const files: FileList | null = event.target.files

                        if (files?.length) {
                            handleStoreImage(files[0])
                        }

                    }} type='file' hidden ref={imageRef} />
                    <Image
                        className={thumbnail ? styles['preview-image'] : styles['image']}
                        src={
                            previewImage ? previewImage : assets.uploadFileIcon
                        }
                        alt=''
                        width={50}
                        height={50}
                    />
                    <p>{!previewImage && <>Upload Course Thumbnail</>}</p>
                </div>
            </div>
            <div className={styles['preview']}>
                {
                    addPreviewSection
                    &&
                    <AddPreview setPreviewLink={setPreviewLink} setAddPreviewSection={setAddPreviewSection} />
                }
                <label>Course Preview</label>
                {
                    previewLink
                        ?
                        <YoutubePlayer setPreviewLink={setPreviewLink} previewLink={previewLink} />
                        :
                        <div onClick={() => setAddPreviewSection(true)} className={styles['preview-container']}>
                            <Image className={styles['image']} width={100} height={100} src={assets.uploadFileIcon} alt='' />
                            <p>Add Course Preview</p>
                        </div>
                }
            </div>
            <div className={styles['chapter']}>
                <label htmlFor={chapterId}>Chapter NO :</label>
                <Input onChange={(event) => setFormInput({ ...formInput, chapterNumber: event.target.value })} required type='number' id={chapterId} className='chapter-input' placeholder='Enter course chapter number' />
            </div>
            <div className={styles['key-points']}>
                <label>What's in this course ?</label>
                <Keypoints setKeypoints={setKeypoinst} keypoints={keypoints} />
            </div>
            <div className={styles['add-chapter']}>
                <label>Add chapter and lecture</label>
                <AddChapter setChapters={setChapters} chapters={chapters} />
            </div>
            <div className={styles['price']}>
                <label htmlFor={priceId}>Price</label>
                <Input onChange={(event) => setFormInput({ ...formInput, price: event.target.value })} required id={priceId} type='number' className='course-form-input' placeholder='Enter course price' />
            </div>
            <Button loadingColor='white' loading={loading} title='Upload Course' type='submit' className='upload-course-button' />
        </form>

    )
}

export default CourseForm