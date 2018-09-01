import React from 'react';
import './styles/CategoryItem.css';
import axios from 'axios';

const CategoryItem = ({ category, item }) => {
  const onStar = (e) => {
    console.log(item);
    axios.post('/save', { category, item})
    .then(results => console.log(results))
    .catch(err => console.log(err));
  };
  return (
    <div>
      { category }
      <h4>{ item.alias }</h4>
      <img className="item-img" src={ item.image_url } target="_blank"/>
      <button type="button" className="btn btn-primary" onClick={ onStar }>Star!</button>
    </div>
  )
};

export default CategoryItem;