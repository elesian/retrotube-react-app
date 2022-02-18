/** @format */
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
      <div className="video-border">
        <h2>VideoPlayer</h2>
        <hr></hr>
        <h2>
          <div className="video-wrapper">
            <iframe
              title={`embeddedVideo`}
              width="100%;"
              height="500px;"
              src={`https://www.youtube.com/embed/${videoId}`}
            ></iframe>
          </div>
        </h2>
      </div>
    );
  }
};

export default VideoPlayer;
