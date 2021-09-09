import { useState } from 'react';
import Head from 'next/head';

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

        const isYoutubeVideoRegex = /youtube.com\/watch\?v=[a-zA-Z]+/;
        if (!isYoutubeVideoRegex.test(videoLink)) {
            alert('invalid youtube link');
            return;
        }

        const cloneVideos = JSON.parse(JSON.stringify(videos));
        cloneVideos.push(videoLink);
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
            <div className="mr-3 mb-1 video-placeholder-container">
                <button className="button-red">
                    x
                </button>

                <div className="video-placeholder">

                </div>
                <p className="text-large">this is a title</p>
            </div>
        </div>
      </div>
    </div>
  );
}
