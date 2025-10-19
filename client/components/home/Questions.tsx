'use client'

import React, { useState } from "react"
import styles from '../../styles/home/questions.module.scss'
import Image from "next/image"
import { assets } from "@/public/assets/assets"
import { questions } from "@/utils/question"

const Questions = () => { 

    const [answerDetail , setAnswerDetail] = useState<{index : number | null , showAnswer : boolean}>({
        index : null,
        showAnswer : false
    })

    return (

        <section className={styles['container']}>
            <div className={styles['section-one']}>
                <div className={styles['title-section']}>
                    <Image className={styles['image']} src={assets.questionIcon} alt="" />
                    <span>
                        Frequently asked
                        Questions
                    </span>
                </div>
                <p className={styles['para']}>
                    For any unanswered questions , reach out to our
                    support team via email . We'll respond as soon as
                    possible to assist you .
                </p>
            </div>
            <div className={styles['section-two']}>
                {
                    questions.map((questionDetail , index) => (

                        <div onClick={() => setAnswerDetail({...answerDetail , index : index , showAnswer : !answerDetail.showAnswer})} className={styles['item-list']} key={index}>
                            <div className={styles['questions']}>
                                {questionDetail.question}
                                {
                                    answerDetail.showAnswer && answerDetail.index === index
                                    ?
                                    <Image className={styles['icon']} src={assets.minusIcon} alt="" />
                                    :
                                    <Image className={styles['icon']} src={assets.plusIcon} alt="" />
                                }
                            </div>
                            <p className={answerDetail.showAnswer && answerDetail.index === index ? styles['show-answer'] : styles['answer']}>
                                {questionDetail.answer}
                            </p>
                        </div>

                    ))
                }
            </div>
        </section>

    )
}

export default Questions