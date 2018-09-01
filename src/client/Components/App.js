import React, { Component } from 'react';
import Search from './Search';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';

class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      categories: [],
      authenticated: false,
    };
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    // axios.get('/login')
    // .then(result => result === 'authenticated' 
    //   ? this.setState({ authenticated : true }) 
    //   : this.setState({ authenticated: false }))
    // .catch(err => console.log(err));
  }
  search(searchTerm) {
    // post to server
    axios.post('/search', { searchTerm })
    .then(results => {
      console.log(results);
      // set state to re render with updated categories
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