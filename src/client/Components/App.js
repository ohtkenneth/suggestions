import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import Search from './Search';
import SavedList from './SavedList';
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
    this.searchPage = this.searchPage.bind(this);
  }
  search(searchData) {
    // post to server
    console.log(searchData,'SEARCH FROM APP')
    axios.post('/search', searchData)
    .then(results => {
      console.log(results);
      // set state to re render with updated categories
      this.setState({
        categories: this.state.categories.concat({ category: searchData.searchValue, items: results.data.businesses})
      });
    })
    .catch(err => console.log('ERROR from App.js search()'));
  }
  searchPage() {
    return (
      <div className="search">
        <Search search={ this.search }/>
        <CategoryGrid categories={ this.state.categories } />
      </div>
    )
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/search">Search</Link>
          <Link to="/save">Saved</Link>

          <Redirect to="/search" />
          <div className="home-nav">
            <Route path="/search" component={ this.searchPage }/>
            <Route path="/save" component={ SavedList }/>
          </div>
        </div>
        
      </BrowserRouter>
    );
  };
}

export default App;