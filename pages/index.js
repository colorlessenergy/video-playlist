import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import EmbedVideo from '../shared/components/EmbedVideo/EmbedVideo';
import createVideoLink from '../shared/video';
import Modal from '../shared/components/Modal';

let ID = 1;

export default function Home() {
    const [ videoLink, setVideoLink ] = useState('');
    const handleVideoLinkInputChange = (event) => {
        setVideoLink(event.target.value)
    }

    let [ videos, setVideos ] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (videoLink === '') {
            alert('missing video link');
            return;
        }

        const isYouTubeVideoRegex = /youtube.com\/watch\?v=[a-zA-Z0-9_]+/;
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
        let cloneVideos = JSON.parse(JSON.stringify(videos));
        ID += 1;
        const videoObject = {
            ID,
            link: embedVideoLink,
            website: website
        }

        cloneVideos.push(videoObject);
        setVideos(cloneVideos);
        setVideoLink('');
    }

    const handleRemoveVideo = (videoID) => {
        const cloneVideos = JSON.parse(JSON.stringify(videos));

        const videoIndex = cloneVideos.findIndex(video => video.ID === videoID);
        cloneVideos.splice(videoIndex, 1);

        setVideos(cloneVideos);
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

        <div className="mt-2 flex flex-wrap justify-content-between">
            { videos.map(video => {
                return (
                    <div
                        key={ video.ID }
                        className="mr-3 mb-1 video-embed-container">
                        <button
                            onClick={ () => handleRemoveVideo(video.ID) }
                            className="button-red">
                            x
                        </button>
                        <div onClick={ () => handleVideoClick(video) }>
                            <EmbedVideo
                                link={ video.link }
                                website={ video.website }
                                disabled={ true } />
                        </div>
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
                    height={ 390 } />
                <div className="flex overflow-x-scroll">
                    { videos.map(video => {
                        let isPlaying = false;
                        if (video.ID === clickedVideo.ID) {
                            isPlaying = true;
                        }

                        return (
                            <div onClick={ () => setClickedVideo(video) }>
                                <EmbedVideo
                                    link={ video.link }
                                    website={ video.website }
                                    disabled={ true }
                                    width={ 400 }
                                    isPlaying={ isPlaying } />
                            </div>
                        );
                    })  }
                </div>
            </Modal>
        ) : (null) }
    </div>
  );
}
