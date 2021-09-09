const EmbedVideo = ({ link, website }) => {
    return (
        <iframe
            width="100%"
            height="200"
            src={ link }
            title={ `${ website } video player` }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
    );
}

export default EmbedVideo;