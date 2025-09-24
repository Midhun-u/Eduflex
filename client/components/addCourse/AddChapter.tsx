'use client'

import React, { useId, useState } from 'react'
import styles from '../../styles/addCourse/addChapter.module.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { v4 as uuidV4 } from 'uuid'
import {
    X as CloseIcon,
    Trash as DeleteIcon
} from 'lucide-react'
import { ChapterType } from '@/types/chapterType'

interface AddChapterProps {
    chapters: Array<ChapterType>,
    setChapters: React.Dispatch<React.SetStateAction<ChapterType[] | []>>
}

const AddChapter = ({ chapters, setChapters }: AddChapterProps) => {

    const chapterId = useId()
    const lectureTitleId = useId()
    const lectureURLId = useId()
    const lectureDurationId = useId()
    const uuid = uuidV4()
    const [addLectureScreen, setLectureScreen] = useState<boolean>(false)
    const [chapterInput, setChapterInput] = useState<string>('')
    const [lectureDetails, setLectureDetails] = useState<{ id: string, title: string, url: string, duration: number }>({
        id: '',
        title: '',
        url: '',
        duration: 0
    })

    //function for add chapter
    const handleAddChapter = () => {

        if (chapterInput) {

            const chapterData = {
                title: chapterInput,
                lectures: []
            }

            setChapters([...chapters, chapterData])
            setChapterInput('')

        }

    }

    //function for remove chapter
    const handleRemoveChapter = (chapterIndex: number) => {

        if (chapterIndex >= 0) {

            const filterdChapters = chapters.filter((_, index) => index !== chapterIndex)
            setChapters(filterdChapters)

        }

    }

    //function for add lecture
    const handleAddLecture = () => {

        if (!lectureDetails.title || !lectureDetails.url || !lectureDetails.duration) {
            toast.error("Fill the fields")
            return
        }

        const youtubeLinkRegex = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/

        if (!youtubeLinkRegex.test(lectureDetails.url)) {
            toast.error("Invalid Link")
            return
        }

        if (sessionStorage.getItem('chapterDetails')) {

            const chapterDetails: { chapterIndex: number } = JSON.parse(sessionStorage.getItem('chapterDetails') as string)
            if (chapterDetails.chapterIndex >= 0) {

                const chapter = chapters[chapterDetails.chapterIndex]

                setLectureDetails({ ...lectureDetails })
                chapter?.lectures.push({ ...lectureDetails, id: uuid })

                setLectureScreen(false)
                setLectureDetails({ ...lectureDetails, title: '', url: '' })
                sessionStorage.removeItem('chapterDetails')
            }
        }
    }
    //function for remove lecture
    const handleRemoveLecture = (chapterIndex: number, lectureIndex: number) => {

        if (chapterIndex >= 0 && lectureIndex >= 0) {

            setChapters(pre => {

                return pre.map((chapter, index) => {

                    if (index !== chapterIndex) {
                        return chapter
                    }

                    return { ...chapter, lectures: chapter.lectures.filter((_, index) => index !== lectureIndex) }

                })

            })

        }

    }

    return (

        <>
            {
                addLectureScreen
                    ?
                    <div className={styles['lecture-screen']}>
                        <div className={styles['lecture-section']}>
                            <CloseIcon onClick={() => setLectureScreen(false)} style={{ position: "absolute", top: "10px", right: "10px" }} />
                            <div>
                                <label htmlFor={lectureTitleId}>Title</label>
                                <Input onChange={(event) => setLectureDetails({ ...lectureDetails, title: event.target.value.trim() })} placeholder='Enter the Title' type='text' className='lecture-input' />
                            </div>
                            <div>
                                <label htmlFor={lectureURLId}>Youtube Embed Link</label>
                                <Input onChange={(event) => setLectureDetails({ ...lectureDetails, url: event.target.value.trim() })} placeholder='Enter the youtube link' type='text' className='lecture-input' />
                            </div>
                            <div>
                                <label htmlFor={lectureDurationId}>Duration (minutes)</label>
                                <Input onChange={(event) => setLectureDetails({ ...lectureDetails, duration: parseInt(event.target.value) })} className='lecture-input' placeholder='Enter the duration' type='number' />
                            </div>
                            <Button onClick={() => handleAddLecture()} title='Add Lecture' type='button' className='add-lecture-button' />
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles['add-chapter-container']}>
                <div className={styles['add-chapter-list']}>
                    {
                        chapters?.map((chapter, chapterIndex) => (

                            <div key={chapterIndex} className={styles['item']}>
                                <div className={styles['section-one']}>
                                    <Input value={chapter.title} id={chapterId} onChange={() => null} className='chapter-input' placeholder='Enter chapter title' type='text' />
                                    <Button onClick={() => handleRemoveChapter(chapterIndex)} className='chapter-remove-button' type='button'   >
                                        <DeleteIcon
                                            size={20}
                                            strokeWidth={1.5}
                                            className={styles['remove-icon']}
                                        />
                                    </Button>
                                </div>
                                <div className={styles['section-two']}>
                                    {
                                        chapter.lectures.map((lecture, lectureIndex) => (

                                            <div className={styles['lecture-container']} key={lectureIndex}>
                                                <Input value={`${lecture.title} (${lecture.duration} minutes)`} onChange={() => null} type='text' className='chapter-input' />
                                                <Button onClick={() => handleRemoveLecture(chapterIndex, lectureIndex)} type='button' className='remove-lecture-button' >
                                                    <DeleteIcon 
                                                        size={20}
                                                        className={styles['remove-icon']}
                                                    />
                                                </Button>
                                            </div>

                                        ))
                                    }
                                    <div>
                                        <Button onClick={() => {
                                            sessionStorage.setItem('chapterDetails', JSON.stringify({ chapterIndex: chapterIndex }))
                                            setLectureScreen(true)
                                        }} title='Add Lecture' className='add-lecture-button' type='button' />
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
                <Input type='text' value={chapterInput} onChange={(event) => setChapterInput(event.target.value)} className='chapter-input' placeholder='Enter chapter title' />
                <div className={styles['button-container']}>
                    <Button onClick={() => handleAddChapter()} title='Add Chapter' type='button' className='add-chapter-button' />
                </div>
            </div>
        </>

    )
}

export default AddChapter