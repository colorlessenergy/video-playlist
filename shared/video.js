export default function createVideoLink ({ videoLink, website }) {
    if (website === 'YouTube') {
        return createYoutubeVideoEmbedLink(videoLink)
    }
}

const createYoutubeVideoEmbedLink = (videoLink) => {
    const youTubeVideoIDRegex = /\?v=[a-zA-Z0-9]+/;
    let youTubeVideoID = videoLink.match(youTubeVideoIDRegex)[0];
    youTubeVideoID = youTubeVideoID.replace('?v=', '');

    return `https://www.youtube.com/embed/${ youTubeVideoID }`;
}