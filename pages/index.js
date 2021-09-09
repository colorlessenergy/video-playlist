import { useState } from 'react';
import Head from 'next/head';

import EmbedVideo from '../shared/components/EmbedVideo/EmbedVideo';
import createVideoLink from '../shared/video';

let ID = 0;

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

        const isYouTubeVideoRegex = /youtube.com\/watch\?v=[a-zA-Z0-9]+/;
        const isValidVideoLink = isYouTubeVideoRegex.test(videoLink);
        if (!isValidVideoLink) {
            alert('invalid video link');
            return;
        }

        if (isYouTubeVideoRegex.test(videoLink)) {
            website = 'YouTube';
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
                        <button className="button-red">
                            x
                        </button>
                        <EmbedVideo
                            link={ video.link }
                            website={ video.website } />
                    </div>
                );
            }) }
       </div>
      </div>
    </div>
  );
}
