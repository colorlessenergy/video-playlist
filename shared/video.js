export function createVideoLink ({ videoLink, website }) {
    if (website === 'YouTube') {
        return createYoutubeVideoEmbedLink(videoLink)
    } else if (website === 'Vimeo') {
        return createVimeoVideoEmbedLink(videoLink);
    }
}

const createYoutubeVideoEmbedLink = (videoLink) => {
    const youTubeVideoIDRegex = /\?v=[a-zA-Z0-9_-]+/;
    let youTubeVideoID = videoLink.match(youTubeVideoIDRegex)[0];
    youTubeVideoID = youTubeVideoID.replace('?v=', '');

    return `https://www.youtube.com/embed/${ youTubeVideoID }`;
}

const createVimeoVideoEmbedLink = (videoLink) => {
    const vimeoVideoIDRegex = /[0-9]+/;
    let vimeoVideoID = videoLink.match(vimeoVideoIDRegex)[0];


    return `https://player.vimeo.com/video/${ vimeoVideoID }`;
}


export function getVideosFromLocalStorage () {
    if (!localStorage.getItem('videos')) {
        localStorage.setItem('videos', JSON.stringify([]));
    }

    if (!localStorage.getItem('ID')) {
        localStorage.setItem('ID', JSON.stringify(0));
    }

    return JSON.parse(localStorage.getItem('videos'));
}

export function storeVideoIntoLocalStorage (videoObject) {
    if (!localStorage.getItem('videos')) {
        localStorage.setItem('videos', JSON.stringify([]));
    }

    if (!localStorage.getItem('ID')) {
        localStorage.setItem('ID', JSON.stringify(0));
    }

    let ID = JSON.parse(localStorage.getItem('ID'));
    ID += 1;
    videoObject.ID = ID;

    let videos = JSON.parse(localStorage.getItem('videos'));
    videos.push(videoObject);

    localStorage.setItem('videos', JSON.stringify(videos));
    localStorage.setItem('ID', JSON.stringify(ID));
}