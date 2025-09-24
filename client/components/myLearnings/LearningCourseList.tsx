import React from 'react'
import styles from '../../styles/myLearnings/learningCourseList.module.scss'
import LearningCourseCard from './LearningCourseCard'
import { EnrolledCourseType } from '@/types/enrolledCourseType'

interface LearningCourseListProps {
    courseList: EnrolledCourseType[]
}

const LearningCourseList = ({ courseList }: LearningCourseListProps) => {

    return (

        <section className={styles['list-container']}>
            {
                courseList.map((course) => {

                    let totalLecturesNumber = 0
                    course?.courseDetails.chapters.map(chapter => {
                        return totalLecturesNumber = totalLecturesNumber + chapter.lectures.length
                    })

                    return <LearningCourseCard
                        key={course?._id}
                        courseId={course.courseId}
                        thumbnail={course?.courseDetails.thumbnail.url}
                        title={course?.courseDetails.title}
                        educatorName={course?.courseDetails.educator.fullname}
                        completedLectureNumber={course?.completedLectures.length}
                        totalLecturesNumber={totalLecturesNumber}
                    />

                })
            }
        </section>

    )
}

export default LearningCourseList