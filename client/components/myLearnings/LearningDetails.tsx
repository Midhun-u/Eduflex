import React from 'react'
import styles from '../../styles/myLearnings/learningDetails.module.scss'

interface LearningDetailsProps{
    completedCourseNumber : number,
    enrolledCourseNumber : number,
    totalPrice : number
}

const LearningDetails = ({completedCourseNumber , enrolledCourseNumber , totalPrice} : LearningDetailsProps) => {

    return (

        <section className={styles['container']}>
            <div className={styles['card']}>
                <span>{enrolledCourseNumber || 0}</span>
                <p>Courses owned</p>
            </div>
            <div className={styles['card']}>
                <span>{completedCourseNumber || 0}</span>
                <p>Courses completed</p>
            </div>
            <div className={styles['card']}>
                <span>₹{totalPrice}</span>
                <p>Total price</p>
            </div>
        </section>

    )
}

export default LearningDetails