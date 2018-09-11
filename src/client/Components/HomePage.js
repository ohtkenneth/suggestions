import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';

import SavedList from './SavedList';
import CategoryGrid from './CategoryGrid';
import Logout from './Logout';
import Map from './Map';

class HomePage extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="home-nav">
            <Link to="/search">Search</Link>
            <Link to="/map">Map</Link>
            <Link to="/save">Saved</Link>
            <Link to="/logout">Logout</Link>
          </div>
          <Redirect to="/search" />
          <div>
            <Route path="/search" component={ Search }/>
            <Route path="/map" component={ Map } />
            <Route path="/save" component={ SavedList }/>
            <Route path="/logout" render={ () => <Logout /> }></Route>
          </div>
        </div>
        
      </Router>
    );
  }
}

export default HomePage;