'use client'

import React from 'react'
import styles from '../../styles/learn/rating.module.scss'
import {
    StarIcon
} from 'lucide-react'

interface RatingProps {
    totalStar?: number;
    rateNumber : number,
    setRateNumber : React.Dispatch<React.SetStateAction<number>>
}

const Rating = ({ totalStar = 5 , rateNumber , setRateNumber}: RatingProps) => {

    const stars = Array(totalStar).fill(0)
    const activeStarColor = "#FFE100"

    return (

        <div className={styles['container']}>
            {
                stars.map((_, index) => (

                    <React.Fragment key={index}>
                        <StarIcon
                            strokeWidth={index + 1 <= rateNumber ? 0 : 0.5}
                            size={25}
                            className={styles['star-icon']}
                            onClick={() => setRateNumber(index + 1)}
                            fill={index + 1 <= rateNumber ? activeStarColor : "#fff"}
                        />
                    </React.Fragment>

                ))
            }
        </div>

    )
}

export default Rating