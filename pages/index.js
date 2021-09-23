import { Fragment, useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import EmbedVideo from '../shared/components/EmbedVideo/EmbedVideo';
import { createVideoLink, deleteVideoFromLocalStorage, getVideosFromLocalStorage, storeVideoIntoLocalStorage } from '../shared/video';

export default function Home() {
    const [ videoLink, setVideoLink ] = useState('');
    const handleVideoLinkInputChange = (event) => {
        setVideoLink(event.target.value)
    }

    let [ videos, setVideos ] = useState([]);
    useEffect(() => {
        const videos = getVideosFromLocalStorage();
        setVideos(videos);
        if (videos.length >= 1) {
            setClickedVideo(videos[0]);
        }

        if (videos.length === 0) {
            setClickedVideo(null);
        }
    }, typeof localStorage !== 'undefined' ? [localStorage.getItem('videos')] : [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (videoLink === '') {
            alert('missing video link');
            return;
        }

        const isVideoNew = videos.findIndex(video => video.originalLink === videoLink);
        if (isVideoNew !== -1) {
            alert('this video is already in the playlist');
            return;
        }

        const isYouTubeVideoRegex = /youtube.com\/watch\?v=[a-zA-Z0-9_-]+/;
        const isVimeoVideoRegex = /vimeo.com\/[0-9]+/;
        const isValidVideoLink = isYouTubeVideoRegex.test(videoLink) || isVimeoVideoRegex.test(videoLink);
        if (!isValidVideoLink) {
            alert('invalid video link');
            return;
        }

        let website = '';
        if (isYouTubeVideoRegex.test(videoLink)) {
            website = 'YouTube';
        } else if (isVimeoVideoRegex.test(videoLink)) {
            website = 'Vimeo';
        }

        let embedVideoLink = createVideoLink({ videoLink, website });
        const videoObject = {
            link: embedVideoLink,
            originalLink: videoLink,
            website: website
        }
        storeVideoIntoLocalStorage(videoObject);
        setVideoLink('');
    }

    const [ ignored, forceUpdate ] = useReducer(x => x + 1, 0);
    const handleRemoveVideo = (videoID) => {
        deleteVideoFromLocalStorage(videoID);
        forceUpdate();
    }

    let [ clickedVideo, setClickedVideo ] = useState(null);

    return (
        <div>
            <Head>
                <title>video playlist</title>
                <meta name="description" content="create video playlist" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Image
                    src="/logo.svg"
                    alt="video playlist logo"
                    width={ 50 }
                    height={ 50 } />
                <form
                    onSubmit={ handleSubmit }
                    className="flex align-items-end">
                    <div className="flex flex-direction-column align-items-start add-video-link-input-container">
                        <label htmlFor="videoLink">
                            add video link
                        </label>
                        <input
                            className="add-video-link-input"
                            type="text"
                            id="videoLink"
                            onChange={ handleVideoLinkInputChange }
                            value={ videoLink }
                            autoComplete="off"
                            placeholder="video link" />
                    </div>
                    <button className="add-video-link-button">
                        +
                    </button>
                </form>

                { videos.length === 0 ? (
                    <div className="text-center">
                        <p className="text-large text-bold my-2">
                            add a video
                        </p>

                        <Image
                            src="/happy.svg"
                            alt="happy emoji"
                            width={ 100 }
                            height={ 100 } />
                    </div>
                ) : (null) }
                { clickedVideo ? ( 
                <Fragment>
                    <div className="flex justify-content-between align-items-center mb-1">
                        { clickedVideo.website === 'YouTube' ? (
                            <Image
                                src="/youtube.svg"
                                alt="YouTube logo"
                                width={ 25 }
                                height={ 25 } />
                        ) : (
                            <Image
                                src="/vimeo.svg"
                                alt="Vimeo logo"
                                width={ 25 }
                                height={ 25 } />
                        ) }
                    </div>
                    <EmbedVideo
                        link={ clickedVideo.link }
                        website={ clickedVideo.website }
                        disabled={ false }
                        height={ 384 } />
                </Fragment>
                ) : (null) }

                { videos.length ? (
                <div className="flex overflow-x-scroll">
                    { videos.map(video => {
                        let isPlaying = false;
                        if (video.ID === clickedVideo.ID) {
                            isPlaying = true;
                        }

                        return (
                            <div key={ video.ID }>
                                <div className="text-right">
                                    <button
                                        onClick={ () => handleRemoveVideo(video.ID) }
                                        className="button-red">
                                        x
                                    </button>
                                </div>

                                <EmbedVideo
                                    link={ video.link }
                                    website={ video.website }
                                    disabled={ true }
                                    width={ 400 }
                                    isPlaying={ isPlaying }
                                    onClick={ () => setClickedVideo(video) } />
                            </div>
                        );
                    })  }
                </div>
                ) : (null) }
            </div>
        </div>
    );
}
