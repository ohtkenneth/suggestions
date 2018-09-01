import React from 'react';
import './styles/SavedListCard.css';

const SavedListCard = (props) => {
  console.log(props);
  return (
    <div className="saved-card">
      <a className="saved-link" href={ props.url }>{ props.name }</a>
      <p>{ props.imageUrl }</p>
      <img className="saved-img" src={ props.imgUrl }/>
      <h4>Rating: { props.rating }</h4>
      <h5>Reviews: {props.reviewCount }</h5>
    </div>
  )
};

export default SavedListCard;