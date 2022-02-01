/** @format */

import VideoList from './VideoList.js';

const VideoPlayer = ({ videoId }) => {
  console.log(videoId);
  if (videoId === '') {
    return (
      <div>
        <h1>VideoPlayer</h1>
        <h2>Video player is empty</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>VideoPlayer</h1>
        <h2>
          <iframe
            title={`embeddedVideo`}
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </h2>
      </div>
    );
  }
};

export default VideoPlayer;
