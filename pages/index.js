import { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import EmbedVideo from '../shared/components/EmbedVideo/EmbedVideo';
import { createVideoLink, deleteVideoFromLocalStorage, getVideosFromLocalStorage, storeVideoIntoLocalStorage } from '../shared/video';
import Modal from '../shared/components/Modal';

export default function Home() {
    const [ videoLink, setVideoLink ] = useState('');
    const handleVideoLinkInputChange = (event) => {
        setVideoLink(event.target.value)
    }

    let [ videos, setVideos ] = useState([]);
    useEffect(() => {
        setVideos(getVideosFromLocalStorage());
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
    const handleVideoClick = (video) => {
        setClickedVideo(video);
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setClickedVideo(null);
    }

    let [ isModalOpen, setIsModalOpen ] = useState(false);

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

                <div className="mt-2 flex flex-wrap justify-content-between">
                    { videos.map(video => {
                        return (
                            <div
                                key={ video.ID }
                                className="mr-3 mb-1 video-embed-container">
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
                                    onClick={ () => handleVideoClick(video) } />
                            </div>
                        );
                    }) }
                </div>
            </div>
            { isModalOpen ? (
                <Modal isOpen={ isModalOpen }>
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
                        <button
                            onClick={ closeModal }
                            className="button-red circle">
                            x
                        </button>
                    </div>
                    <EmbedVideo
                        link={ clickedVideo.link }
                        website={ clickedVideo.website }
                        disabled={ false }
                        height={ 384 } />
                    <div className="flex overflow-x-scroll">
                        { videos.map(video => {
                            let isPlaying = false;
                            if (video.ID === clickedVideo.ID) {
                                isPlaying = true;
                            }

                            return (
                                <EmbedVideo
                                    key={ video.ID }
                                    link={ video.link }
                                    website={ video.website }
                                    disabled={ true }
                                    width={ 400 }
                                    isPlaying={ isPlaying }
                                    onClick={ () => setClickedVideo(video) } />
                            );
                        })  }
                    </div>
                </Modal>
            ) : (null) }
        </div>
    );
}
