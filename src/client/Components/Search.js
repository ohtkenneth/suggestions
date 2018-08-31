import React from 'react';

const Search = () => {

  return (
    <div>
      <form action="/search" method="post">
        <input type="text"/>
        <button type="submit">Search!</button>
      </form>
    </div>
  )
};

export default Search;