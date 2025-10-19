import React, { useId, useState } from 'react'
import styles from '../../styles/addCourse/courseForm.module.scss'
import Input from '../ui/Input'
import Button from '../ui/Button'

interface KeypointsProps {
    keypoints: string[],
    setKeypoints : React.Dispatch<React.SetStateAction<Array<string>>>
}

const Keypoints = ({ keypoints , setKeypoints}: KeypointsProps) => {

    const keyPointId = useId()
    const [value , setValue] = useState<string>()

    //function for adding key point
    const handleAddKeypoint = () => {

        if(value){
            setKeypoints((keypoints) => [...keypoints , value])
            setValue('')
        }
       
    }

    //function for removing key point at a specific position
    const handleRemoveKeypoint = (indexOfKeypoint : number) => {

        if(indexOfKeypoint >=  0){
            const filteredKeypoints = keypoints.filter((_ , index) => index !== indexOfKeypoint)
            setKeypoints(filteredKeypoints)
        }

    }

    return (

        <div className={styles['key-points-container']}>
            {
                    keypoints?.length !== 0
                    ?
                    <div style={{display : "flex" , flexDirection : "column" , gap : "10px"}}>
                        {
                            keypoints.map((keypoint , index) => (

                                <div style={{display : "flex" , alignItems : 'center' , gap : '10px'}} key={index}>
                                    <Input value={keypoint} onChange={() => null} className='key-point-input' type='text' />
                                    <Button onClick={() => handleRemoveKeypoint(index)} title='Remove' type='button' disable={false} className='remove-button' />
                                </div>

                            ))
                        }
                        <Input value={value} onChange={(event) => setValue(event.target.value)} className='key-point-input' type='text' placeholder="Enter the key points of what's include in this course" />
                    </div>
                    :
                    <Input onChange={(event) => setValue(event.target.value)} id={keyPointId} className='key-point-input' type='text' placeholder="Enter the key highlights" />
            }
            {
                keypoints.length <= 30
                &&
                <Button onClick={() => handleAddKeypoint()} className='add-key-point' type='button' title='Add' />
            }
        </div>

    )
}

export default Keypoints