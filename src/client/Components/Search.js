import React, { Component } from 'react';
import yelp from '../../helpers/yelp';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autocomplete: [],
    };

    this.onSearch = this.onSearch.bind(this);
  }
  onSearch() {
    // this.props.search(document.getElementById('searchInput').value);
    console.log(document.getElementById('searchInput').value);
    this.props.search(document.getElementById('searchInput').value);
  }
  onInputChange(e) {
    // console.log(e.target.value);
    // // get autocomplete

    // axios.post('/auto', { term: e.target.value })
    // .then(results => console.log(results))
    // .catch(err => console.log('COMING FROM SEARCH', err));
    
    // axios.get('https://api.yelp.com/v3/autocomplete', { params: { text: 'eat' }})
    // .then(results => console.log(results))
    // .catch(err => console.log('COMING FROM SEARCH', err));
  }
  render() {
    return (
      <div>
        <form autoComplete="off" action="/search" method="post">
          <div className="form-group">
            <input id="searchInput" className="form-control" type="text" onChange={ this.onInputChange } list="autocompleteData"/>
            <datalist id="autocompleteData">
              {
                this.state.autocomplete.map(term => <option>{ term }</option>)
              }
            </datalist>
            <button type="button" onClick={ this.onSearch }>Search!</button>
          </div>
        </form>
      </div>
    )
  }
}
export default Search;
// const Search = ({ search }) => {
//   let searchTerm = '';
//   const onSearch = () => {
//     document.getElementById('searchInput').value = '';
  
//     search(searchTerm);
//   }
//   return (
//     <div>
//       <form action="/search" method="post">
//         <input id="searchInput" type="text" onChange={ (e) => searchTerm = e.target.value } />
//         <button type="button" onClick={ onSearch }>Search!</button>
//       </form>
//     </div>
//   )
// };

