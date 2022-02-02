/** @format */

import { useState } from 'react';
import publicAPIKey from './publicAPIKey';
import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
let Buffer = require('buffer/').Buffer;

const axios = require('axios').default;

const VideoList = ({ search }) => {
  const searchTerm = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}`;
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState('No video selected');

  const getBase64 = (url) => {
    return axios
      .get(`https://murmuring-journey-05155.herokuapp.com/${url}`, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        const image = new Buffer.from(response.data, 'binary').toString(
          'base64'
        );
        return image;
      })
      .catch((err) => console.log('ERROR' + err));
  };

  useEffect(() => {
    if (search !== '') {
      fetch(searchTerm)
        .then((res) => res.json())
        .then(({ items }) => {
          items.forEach((item) => {
            return getBase64(item.snippet.thumbnails.default.url).then(
              (image) => {
                item.thumbnailURL = image;
              }
            );
          });
          return items;
        })
        .then((items) => {
          setList((old) => [...items]);
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
        <p>Loaded</p>
        {list.length !== 0 ? (
          <ul className="search-results">
            {list.map((item) => {
              return (
                <li key={item.id.videoId}>
                  {item.snippet.description}
                  <div>
                    <img
                      src={console.log(Object.keys(item))}
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
