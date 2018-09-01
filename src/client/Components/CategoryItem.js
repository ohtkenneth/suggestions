import React from 'react';
import './styles/CategoryItem.css';
import axios from 'axios';

const CategoryItem = ({ category, item }) => {
  const onSave = (e) => {
    console.log(item);
    axios.post('/save', { category, item})
    .then(results => console.log(results))
    .catch(err => console.log(err));
  };
  return (
    <div className="category-item">
      {/* { category } */}
      <h4>{ item.name }</h4>
      <img className="category-item-img" src={ item.image_url } target="_blank"/>
      <h4>Rating: { item.rating }</h4>
      <h5>Reviews: { item.review_count }</h5>
      <button type="button" className="btn btn-primary" onClick={ onSave }>Save!</button>
    </div>
  )
};

export default CategoryItem;