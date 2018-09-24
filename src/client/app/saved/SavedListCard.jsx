import React from 'react';
import './styles/SavedListCard.css';

const SavedListCard = (props) => {
  console.log(props);
  return (
    <div className="saved-card">
      <a className="saved-link" href={ props.url } target="_blank">{ props.name }</a>
      <p>{ props.imageUrl }</p>
      <img className="saved-img" src={ props.imgUrl }/>
      <h6>Rating: { props.rating }</h6>
      <h6>Reviews: {props.reviewCount }</h6>
    </div>
  )
};

export default SavedListCard;