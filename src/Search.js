/** @format */

import { useState } from 'react';
import VideoList from './VideoList';

const Search = () => {
  const [search, setSearch] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitisedString = event.target[0].value.split(/\s+/).join('');
    setSearch(sanitisedString);
  };

  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search"
          name="fname"
          placeholder="Enter search term..."
          required
          on
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <VideoList search={search} />
      </div>
    </div>
  );
};

export default Search;
