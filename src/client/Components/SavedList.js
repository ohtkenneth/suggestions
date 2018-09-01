import React, { Component } from 'react';
import axios from 'axios';
import SavedListCard from './SavedListCard';
import './styles/SavedList.css';

class SavedList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savedItems: [],
    };
    this.getSavedItems.bind(this);
  }
  componentDidMount() {
    this.getSavedItems();
  }
  getSavedItems() {
    axios.get('/save')
    .then(savedItems => {
      this.setState({ savedItems: savedItems.data.savedItems });
    })
    .catch(err => console.log('ERROR from saveditems', err));
  }
  render() {
    // render out all categories and item
    console.log(this.state);
    return (
      <div className="saved-list-container">
        {
          this.state.savedItems.map((savedItem) => (
            <SavedListCard url={ savedItem.item.url } imgUrl={ savedItem.item.image_url } 
              name={ savedItem.item.name } rating={ savedItem.item.rating } 
              reviewCount={ savedItem.item.review_count }/>
          ))
        }
      </div>
    );
  };
}

export default SavedList;