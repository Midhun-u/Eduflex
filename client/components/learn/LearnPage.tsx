'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { getCourseDetailsApi } from '@/api/course'
import styles from '../../styles/learn/learnPage.module.scss'
import ChapterAccordion from './ChapterAccordion'
import Image from 'next/image'
import Iframe from '../ui/Iframe'
import {
    X as CloseIcon,
    CheckCheckIcon,
    CheckIcon
} from 'lucide-react'
import Button from '../ui/Button'
import { completeLectureApi, getEnrolledCourseApi } from '@/api/enrollment'
import NotFound from '../layout/NotFound'
import { ChapterType } from '@/types/chapterType'

const LearnPage = () => {

    const { courseId } = useParams()
    const [courseDetails, setCourseDetails] = useState<{ id: string, thumbnail: { url: string, publicId: string }, title: string, chapters: ChapterType[] }>()
    const [lectureDetails, setLectureDetails] = useState<{ url: string, id: string, title: string, chapterNumber: number, lectureNumber: number }>({
        chapterNumber: 0,
        lectureNumber: 0,
        url: '',
        id: '',
        title: ''
    })
    const [showPlayer, setShowPlayer] = useState<boolean>(false)
    const [enrolledItem, setEnrolledItem] = useState<
        {
            _id: string,
            courseId: string,
            userId: string
            completed: boolean,
            completedLectures: string[]
        }
    >()

    //function for fetching course details
    const handleFetchCourseDetails = async () => {

        try {

            const result = await getCourseDetailsApi(courseId as string, ['id', 'thumbnail', 'title', 'chapters'])
            if (result?.success) {
                setCourseDetails(result?.courseDetails)
            }

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }

    }

    //function for getting enrolled item
    const handleGetEnrolledItem = async () => {

        try {

            const result = await getEnrolledCourseApi(courseId as string)
            if (result?.success) {
                setEnrolledItem(result?.enrolledCourse)
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }

    }

    //function for completion lecture
    const handleCompleteLecture = async () => {

        try {

            if (enrolledItem?._id && enrolledItem) {

                let totalLecturesNumber = 0
                courseDetails?.chapters.map((chapter) => {
                    return totalLecturesNumber += chapter.lectures.length
                })

                const completed = totalLecturesNumber - 1 === enrolledItem?.completedLectures.length

                const result = await completeLectureApi(enrolledItem._id as string, lectureDetails.id, completed)

                if (result?.success) {

                    const newCompletedLectures = enrolledItem?.completedLectures || []
                    newCompletedLectures.push(lectureDetails.id)
                    setEnrolledItem({ ...enrolledItem, completedLectures: newCompletedLectures })
                    toast.success(result?.message)

                }

            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }

    }

    useEffect(() => {
        handleGetEnrolledItem()
        handleFetchCourseDetails()
    }, [courseId])

    if (!courseDetails) {
        return <NotFound />
    }

    return (

        <section className={styles['container']}>
            <div className={showPlayer ? styles['hide-details-container'] : styles['details-container']}>
                <h1 className={styles['course-title']}>{courseDetails?.title || ''}</h1>
                <div className={styles['course-structure-container']}>
                    <span>Course Structure</span>
                    {
                        courseDetails?.chapters.length
                        &&
                        <ChapterAccordion
                            chapters={courseDetails?.chapters}
                            setLectureDetails={setLectureDetails}
                            setShowPlayer={setShowPlayer}
                        />
                    }
                </div>
            </div>
            <div className={showPlayer ? styles['show-player-container'] : styles['player-container']}>
                {
                    showPlayer
                    &&
                    <CloseIcon onClick={() => setShowPlayer(false)} size={25} className={styles['close-icon']} />

                }
                {
                    !lectureDetails.url && courseDetails?.thumbnail.url
                        ?
                        <Image className={styles['thumbnail']} src={courseDetails?.thumbnail.url} width={300} height={150} alt='' />
                        :
                        (
                            lectureDetails.url
                            &&
                            <Iframe youtubePreviewLink={lectureDetails.url} className={styles['lecture-player']} />
                        )
                }
                {
                    lectureDetails?.title
                    &&
                    <div className={styles['lecture-details']}>
                        <p>{lectureDetails.chapterNumber}:{lectureDetails.lectureNumber} {lectureDetails.title}</p>
                    </div>

                }
                {
                    lectureDetails.url
                    &&
                    (
                        enrolledItem?.completedLectures.includes(lectureDetails?.id)
                            ?
                            <Button type='button' className='lecture-completed-button'>
                                <CheckIcon
                                    color='#fff'
                                    size={20}
                                    strokeWidth={1.2}
                                />
                                <p>Completed</p>
                            </Button>
                            :
                            <Button onClick={() => handleCompleteLecture()} type='button' className='lecture-complete-button'>
                                <CheckCheckIcon
                                    strokeWidth={1.2}
                                    size={20}
                                />
                                <p>Mark as complete</p>
                            </Button>
                    )

                }
            </div>
        </section>

    )
}

export default LearnPage