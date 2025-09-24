'use client'

import React from 'react'
import styles from '../../styles/learn/chapterAccordion.module.scss'
import CourseStructureAccordion from '../courses/CourseStructureAccordion'
import { ChapterType } from '@/types/chapterType'

interface ChapterAccordionProps {
  chapters: ChapterType[],
  setLectureDetails : React.Dispatch<React.SetStateAction<{chapterNumber : number , lectureNumber : number , url : string , id : string , title : string}>>,
  setShowPlayer : React.Dispatch<React.SetStateAction<boolean>>
}

const ChapterAccordion = ({ chapters , setLectureDetails , setShowPlayer }: ChapterAccordionProps) => {

  //function for getting lecture link
  const handleGetLectureLink = (lectureLink : string , lectureId : string , lectureTitle : string , chapterNumber : number , lectureNumber : number) => {

    setLectureDetails({...{chapterNumber : chapterNumber , lectureNumber : lectureNumber , url : lectureLink , id : lectureId , title : lectureTitle}})
    setShowPlayer(true)

  }

  return (

    <div className={styles['accordion-container']}>
      {
        chapters.map((chapter, index) => (

          <CourseStructureAccordion
            key={index}
            chapter={chapter}
            chapterIndex={index}
            preview={false}
            onClickOnLink={handleGetLectureLink}
          />

        ))
      }
    </div>

  )
}

export default ChapterAccordion