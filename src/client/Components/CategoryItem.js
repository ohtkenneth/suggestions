import React from 'react';
import './styles/CategoryItem.css';

const CategoryItem = ({ category, item }) => {
  const onStar = (e) => {
    console.log(item);
  };
  return (
    <div>
      { category }
      <h4>{ item.alias }</h4>
      <img className="item-img" src={ item.image_url }/>
      <button type="button" className="btn btn-primary" onClick={ onStar }>Star!</button>
    </div>
  )
};

export default CategoryItem;