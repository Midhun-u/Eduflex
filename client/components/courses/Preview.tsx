import React from 'react'
import styles from '../../styles/courses/preview.module.scss'
import Iframe from '../ui/Iframe'

interface PreviewProps {
    youtubePreviewLink: string,
}

const Preview = ({ youtubePreviewLink}: PreviewProps) => {

    return (

        <div className={styles['container']}>
            <div className={styles['youtube-player-container']}>
                <h1>Course Preview</h1>
                <Iframe youtubePreviewLink={youtubePreviewLink} className={styles['youtube-player']} />
            </div>
        </div>

    )
}

export default Preview