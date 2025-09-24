import React from 'react'

interface IframeProps{
    youtubePreviewLink : string,
    className? : string
}

const Iframe = ({youtubePreviewLink , className} : IframeProps) => {

    return (

        <iframe
            className={className}
            src={youtubePreviewLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        >

        </iframe>

    )
}

export default Iframe