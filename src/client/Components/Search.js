import React, { Component } from 'react';
import yelp from '../../helpers/yelp';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autocomplete: [],
      location: '',
      searchValue: '',
      searchBoxes: [],
      searchTerms: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onSearch() {
    const { location, searchValue } = this.state;
    // this.props.search(document.getElementById('searchInput').value);
    // document.getElementById('searchInput').value = '';
    this.props.search({ searchValue, location });
  }
  onInputChange(e) {
    let inputValue = e.target.value;
    if (e.target.value !== '') {
      // axios(searchOptions); 
      axios.post('/autocomplete', { text: e.target.value })
      .then(autoTerms => {
        this.setState({ 
          autocomplete: autoTerms.data,
          searchValue: inputValue,
        });

        console.log(this.state);
      })
      .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div>
        <form autoComplete="off" action="/search" method="post">
          <div className="form-group">
            <br/>
            <input id="locationInput" className="form-control" type="text" onChange={ (e) => this.setState({ location: e.target.value })} placeholder="Input location"/>
            <input id="searchInput" className="form-control" type="text" onChange={ this.onInputChange } list="autocompleteData" placeholder="What are you interested in?"/>
            <datalist id="autocompleteData">
              {
                this.state.autocomplete.map((term, index)=> <option key={ index }>{ term }</option>)
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

