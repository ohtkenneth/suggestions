import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import Search from './Search';
import SavedList from './SavedList';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';
import Logout from './Logout';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      categories: [],
    };

    this.search = this.search.bind(this);
    this.searchPage = this.searchPage.bind(this);
  }
  search(searchData) {
    // post to server
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
          <div className="home-nav">
            <Link to="/search">Search</Link>
            <Link to="/save">Saved</Link>
            <Link to="/logout">Logout</Link>
          </div>
          <Redirect to="/search" />
          <div>
            <Route path="/search" component={ this.searchPage }/>
            <Route path="/save" component={ SavedList }/>
            <Route path="/logout" render={ () => <Logout authenticate={ this.props.authenticate }/> }></Route>
          </div>
        </div>
        
      </BrowserRouter>
    );
  };
}

export default App;