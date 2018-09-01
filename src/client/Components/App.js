import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import Search from './Search';
import SavedList from './SavedList';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';
import './styles/App.css';

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
  logout() {
    axios.post('/logout')
    .then(() => this.props.authenticate())
    .catch(err => console.log(err));
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="home-nav">
            <Link to="/search">Search</Link>
            <Link to="/save">Saved</Link>
            {/* <button className="btn btn-danger" onClick={ () => axios.post('/signout')}>Signout</button> */}
            <Link to="/logout">Logout</Link>
          </div>
          <Redirect to="/search" />
          <div>
            <Route path="/search" component={ this.searchPage }/>
            <Route path="/save" component={ SavedList }/>
            <Route path="/logout" component= { this.logout }/>
          </div>
        </div>
        
      </BrowserRouter>
    );
  };
}

export default App;