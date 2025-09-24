import React from 'react'
import styles from '../../styles/addCourse/youtubePlayer.module.scss'
import Button from '../ui/Button'
import Iframe from '../ui/Iframe'

interface YoutubePlayerProps {
    previewLink: string,
    setPreviewLink : React.Dispatch<React.SetStateAction<string>>
}

const YoutubePlayer = ({ previewLink , setPreviewLink }: YoutubePlayerProps) => {

    return (

        <>
            <Iframe youtubePreviewLink={previewLink} className={styles['youtube-player']} />
            <Button onClick={() => setPreviewLink('')} title='Remove Preview' className='remove-preview-button' type='button' disable={false} />
        </>

    )
}

export default YoutubePlayer