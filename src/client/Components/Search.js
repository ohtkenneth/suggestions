import React from 'react';

const Search = ({ search }) => {
  let searchTerm = '';
  const onSearch = () => {
    document.getElementById('searchInput').value = '';
  
    search(searchTerm);
  }
  return (
    <div>
      <form action="/search" method="post">
        <input id="searchInput" type="text" onChange={ (e) => searchTerm = e.target.value } />
        <button type="button" onClick={ onSearch }>Search!</button>
      </form>
    </div>
  )
};

export default Search;