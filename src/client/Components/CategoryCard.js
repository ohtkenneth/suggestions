import React from 'react';
import CategoryItem from './CategoryItem';
import './styles/CategoryCard.css';

// category: string, items: []
const CategoryCard = ({ category, items }) => {
  return (
    <div className="category-card">
      <h4>{ category }</h4>
      {
        items.map((item) => <CategoryItem key={ item.id } category={ category } item= { item } />)
      }
    </div>
  )
};

export default CategoryCard;