import React from 'react';
import SearchGridCardItem from '../shared/GridCardItem';
import './styles/CategoryCard.css';

// category: string, items: []
const SearchGridCard = ({ category, items }) => {
  console.log(items);
  return (
    <div className="category-card">
      {
        items.map((item) => <SearchGridCardItem key={ item.id } category={ category } item= { item } />)
      }
    </div>
  )
};

export default SearchGridCard;