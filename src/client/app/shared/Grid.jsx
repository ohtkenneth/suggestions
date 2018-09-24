import React from 'react';
import SearchGridCard from './GridCard';
import './styles/Grid.css';

// searches is an object of objects { searchTerm: { businesses, region, total }}
const Grid = ({ searches }) => {
  console.log(searches)
  return (
    <div className="category-grid">
      { searches.map((search) => <GridCard key={ search.searchTerm } category={ search.searchTerm } items={ search.items.businesses }/>)}
    </div>
  )
};

export default Grid;