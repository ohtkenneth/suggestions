import React from 'react';
import './styles/CategoryItem.css';

const CategoryItem = ({ category, item }) => {
  return (
    <div>
      { category }
      <h4>{ item.alias }</h4>
      <img className="item-img" src={ item.image_url }/>
    </div>
  )
};

export default CategoryItem;