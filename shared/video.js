export default function createVideoLink ({ videoLink, website }) {
    if (website === 'YouTube') {
        return createYoutubeVideoEmbedLink(videoLink)
    } else if (website === 'Vimeo') {
        return createVimeoVideoEmbedLink(videoLink);
    }
}

const createYoutubeVideoEmbedLink = (videoLink) => {
    const youTubeVideoIDRegex = /\?v=[a-zA-Z0-9]+/;
    let youTubeVideoID = videoLink.match(youTubeVideoIDRegex)[0];
    youTubeVideoID = youTubeVideoID.replace('?v=', '');

    return `https://www.youtube.com/embed/${ youTubeVideoID }`;
}

const createVimeoVideoEmbedLink = (videoLink) => {
    const vimeoVideoIDRegex = /[0-9]+/;
    let vimeoVideoID = videoLink.match(vimeoVideoIDRegex)[0];


    return `https://player.vimeo.com/video/${ vimeoVideoID }`;
}