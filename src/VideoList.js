/** @format */

import { useState, useRef } from 'react';
import publicAPIKey from './publicAPIKey';
import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
let Buffer = require('buffer/').Buffer;
const axios = require('axios').default;

const VideoList = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}`
  );
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoId, setVideoId] = useState('No video selected');
  const previousPage = useRef(null);
  const nextPage = useRef(null);
  let currentSearch = useRef(null);

  const updatePagination = (forward) => {
    //if forwards, update searchTerm, re-run use-effect
    if (forward === true) {
      console.log('next page');
      console.log(nextPage);
      setSearchTerm(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}&pageToken=${nextPage.current}`
      );
    }
    if (forward !== true && previousPage.current !== null) {
      console.log('previous page');
      console.log(previousPage);
      setSearchTerm(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}&pageToken=${previousPage.current}`
      );
    }
  };

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

  const addImage = async (item, image) => {
    return await (item.thumbnailURL = image);
  };

  useEffect(() => {
    console.log('use-effect ran');
    if (search !== '') {
      if (search !== currentSearch.current) {
        currentSearch.current = search;
        previousPage.current = null;
        nextPage.current = null;
        setSearchTerm(
          () =>
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&publishedBefore=2008-01-01T00%3A00%3A00Z&q=${search}&key=${publicAPIKey}`
        );
      } else {
        console.log(searchTerm);
        fetch(searchTerm)
          .then((res) => res.json())
          .then(({ items, nextPageToken, prevPageToken }) => {
            console.log(nextPageToken);
            nextPage.current = nextPageToken;
            if (prevPageToken) {
              previousPage.current = prevPageToken;
            }
            const newList = Promise.all(
              items.map(async (item) => {
                return await getBase64(
                  item.snippet.thumbnails.default.url
                ).then((image) => {
                  addImage(item, image);
                  return item;
                });
              })
            );
            return newList;
          })
          .then((newList) => {
            setList(() => newList);
            setIsLoading(false);
          });
      }
    }
  }, [search, searchTerm]);

  if (search === '') {
    return <h2></h2>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (list.length === 0) return <h2>No results found</h2>;
  else
    return (
      <div className="task-list">
        <p>Loaded</p>
        <div>
          <VideoPlayer videoId={videoId}></VideoPlayer>
        </div>
        {list.length !== 0 ? (
          <ul className="search-results">
            <h2>Search Results</h2>
            <hr></hr>
            {list.map((item) => {
              return (
                <li key={item.id.videoId}>
                  {item.snippet.description}
                  <div>
                    <img
                      src={`data:image/jpeg;base64, ${item.thumbnailURL}`}
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
        <button
          className="nav-button"
          onClick={() => {
            updatePagination(false);
          }}
        >
          Previous Page
        </button>
        <button
          className="nav-button"
          onClick={() => {
            updatePagination(true);
          }}
        >
          Next Page
        </button>
      </div>
    );
};

export default VideoList;
