/** @format */

import { useState } from 'react';
import publicAPIKey from './publicAPIKey';
import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';

const VideoList = ({ search }) => {
  const searchTerm = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}`;
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState('No video selected');

  useEffect(() => {
    if (search !== '') {
      fetch(searchTerm)
        .then((res) => res.json())
        .then((videosFromApi) => {
          console.log(videosFromApi.items);
          setList(videosFromApi.items);
          setIsLoading(false);
        });
    }
  }, [search]);

  if (search === '') {
    return <h2>No results found</h2>;
  }

  if (isLoading) return <p>Loading...</p>;
  else
    return (
      <div className="task-list">
        <h2>Not Loading</h2>
        {list.length !== 0 ? (
          <ul className="search-results">
            {list.map((item) => {
              return (
                <li key={item.id.videoId}>
                  {item.snippet.description}
                  <div>
                    <img
                      src={item.snippet.thumbnails.default.url}
                      alt={`img-${item.id.videoId}`}
                    ></img>
                  </div>
                  <button
                    className="block"
                    onClick={() => setVideoId(item.id.videoId)}
                  >
                    WATCH
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2>No results found</h2>
        )}
        <div>
          <VideoPlayer videoId={videoId}></VideoPlayer>
        </div>
      </div>
    );
};

export default VideoList;
