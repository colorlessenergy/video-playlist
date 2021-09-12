const EmbedVideo = ({ link, website, disabled, height = "200", width = "100%", isPlaying }) => {
    return (
        <div className="position-relative">
            <iframe
                width={ width }
                height={ height }
                src={ link }
                title={ `${ website } video player` }
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
                { disabled ? (
                    <div className="disabled">
                        { isPlaying ? (
                            <div className="is-playing-container">
                                is playing
                            </div>
                        ) : (null) }
                    </div>
                ) : (null) }
        </div>
    );
}

export default EmbedVideo;