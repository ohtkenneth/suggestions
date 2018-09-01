import React, { Component } from 'react';
import Search from './Search';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    // post to server
    // console.log('searching', searchTerm);
    // axios.post('/search', { searchTerm });
    axios.post('/search', { searchTerm })
    .then(results => {
      this.setState({
        categories: this.state.categories.concat({ category: searchTerm, items: results.data.businesses})
      });
    })
    .catch(err => console.log('ERROR from App.js search()'));
  }
  render() {
    console.log(this.state);
    return (
      <div>
        This is the new world
        <Search search={ this.search }/>
        <CategoryGrid categories={ this.state.categories } />
      </div>
    )
  }
}

export default App;