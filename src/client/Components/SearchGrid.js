import React from 'react';
import SearchGridCard from './SearchGridCard';
import './styles/CategoryGrid.css';

// searches is an object of objects { searchTerm: { businesses, region, total }}
const SearchGrid = ({ searches }) => {
  console.log(searches)
  return (
    <div className="category-grid">
      { searches.map((search) => <SearchGridCard key={ search.searchTerm } category={ search.searchTerm } items={ search.items.businesses }/>)}
    </div>
  )
};

export default SearchGrid;