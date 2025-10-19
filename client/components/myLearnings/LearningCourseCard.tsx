'use client'

import React, { useEffect, useState } from 'react'
import styles from '../../styles/myLearnings/learningCourseCard.module.scss'
import Image from 'next/image'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

interface LearningCourseCardProps {
    thumbnail: string,
    title: string,
    educatorName: string,
    courseId: string,
    completedLectureNumber: number,
    totalLecturesNumber: number;
}

const LearningCourseCard = ({ thumbnail, title, educatorName, courseId, completedLectureNumber, totalLecturesNumber }: LearningCourseCardProps) => {

    const router = useRouter()
    const [progress, setProgress] = useState<number>(0)

    //function for getting progress
    const handleGetProgress = () => {

        const percentage = Math.ceil((completedLectureNumber / totalLecturesNumber) * 100)
        setProgress(percentage)

    }

    useEffect(() => {
        handleGetProgress()
    }, [])

    return (

        <div className={styles['card-container']}>
            {
                thumbnail
                &&
                <Image className={styles['thumbnail']} src={thumbnail} alt='' width={220} height={120} />
            }
            <div className={styles['details-container']}>
                <h1 className={styles['title']}>{title}</h1>
                <p>by {educatorName}</p>
                <div className={styles['progress-container']}>
                    <div className={styles['progress-details']}>
                        <p>Progress</p>
                        <p>{progress === 100 ? `Completed` : `${progress}% completed`}</p>
                    </div>
                    <div style={{ width: `${progress}%` }} className={progress === 100 ? styles['progress-success'] : styles['progress']}></div>
                </div>
                {
                    progress === 100
                        ?
                        <Button
                            onClick={() => router.push(`/my-learnings/learn/${courseId}`)}
                            title='Review Course'
                            type='button'
                            className='course-review-button'
                        />
                        :
                        <Button
                            onClick={() => router.push(`/my-learnings/learn/${courseId}`)}
                            title='Continue Learning'
                            type='button'
                            className='learn-button'
                        />
                }
            </div>
        </div>

    )
}

export default LearningCourseCard