'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/courses/courseStructureAccordion.module.scss'
import { assets } from '@/public/assets/assets'
import { Video as VideoIcon } from 'lucide-react'
import { ChapterType } from '@/types/chapterType'

interface CourseStructureAccordionProps {
    chapter: ChapterType,
    chapterIndex: number,
    preview: boolean,
    onClickOnLink?: (link: string, id: string, title: string, chapterNumber: number, lectureNumber: number,) => void
}

const CourseStructureAccordion = ({ chapter, chapterIndex, preview, onClickOnLink }: CourseStructureAccordionProps) => {

    const [chapterDetails, setChapterDetails] = useState<{ show: boolean, index: number | null }>({
        show: false,
        index: null
    })

    //function for calculating lectures duration
    const handleCalculateDuration = (lectures: any[]) => {

        let minuteNumber: number = 0

        lectures.map((lecture) => {

            const minute: number = typeof lecture.duration === 'string' ? parseInt(lecture.duration) : lecture.duration
            return minuteNumber = minuteNumber + minute

        })

        return minuteNumber

    }

    return (

        <React.Fragment>
            <div onClick={() => setChapterDetails({ ...chapterDetails, show: !chapterDetails?.show, index: chapterIndex })} className={styles['chapter-container']}>
                <Image className={chapterDetails?.index === chapterIndex && chapterDetails.show ? styles['rotate-arrow-icon'] : styles['arrow-icon']} src={assets.arrowIcon} width={19} height={19} alt='' />
                <span>{chapter.title}</span>
                <p>{chapter.lectures.length} Lectures - {handleCalculateDuration(chapter?.lectures)} minutes</p>
            </div>
            <div className={styles['lecture-container']}>
                {
                    chapter?.lectures.map((lecture, lectureIndex) => (
                        <li key={lectureIndex} className={chapterDetails?.show && chapterDetails?.index === chapterIndex ? styles['show-lecture'] : ''}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: "center" }}>
                                <VideoIcon
                                    strokeWidth={1}
                                    size={22}
                                    className={styles['icon']}
                                />
                                <span>{lecture.title}</span>
                            </div>
                            {
                                preview
                                    ?
                                    <p className={styles['duration']}>{lecture.duration} minutes</p>
                                    :
                                    <p onClick={() => onClickOnLink ? onClickOnLink(lecture.url, lecture.id, lecture.title, chapterIndex + 1, lectureIndex + 1) : null} className={styles['watch-link']}>Watch</p>
                            }
                        </li>
                    ))
                }
            </div>
        </React.Fragment>

    )
}

export default CourseStructureAccordion