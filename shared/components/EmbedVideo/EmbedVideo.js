const EmbedVideo = ({ link, website, disabled }) => {
    return (
        <div className="position-relative">
            <iframe
                width="100%"
                height="200"
                src={ link }
                title={ `${ website } video player` }
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
                { disabled ? (
                    <div className="disabled"></div>
                ) : (null) }
        </div>
    );
}

export default EmbedVideo;