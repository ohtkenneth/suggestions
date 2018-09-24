import React from 'react';
import GridCardItem from './GridCardItem';
import './styles/GridCard.css';

// category: string, items: []
const GridCard = ({ category, items }) => {
  console.log(items);
  return (
    <div className="category-card">
      {
        items.map((item) => <GridCardItem key={ item.id } category={ category } item= { item } />)
      }
    </div>
  )
};

export default GridCard;