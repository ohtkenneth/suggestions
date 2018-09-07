import React, { Component } from 'react';
import yelp from '../../helpers/yelp';
import axios from 'axios';
import CategoryGrid from './CategoryGrid';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autocomplete: [],
      locationAutocomplete: [],
      location: '',
      searchValue: '',
      searchBoxes: [],
      searchTerms: [],
    };

    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentDidMount() {
    var options = {
      types: ['(cities)'],
      componentRestrictions: {country: 'us'}
    };
    const input = document.getElementById('locationInput');
    const autocomplete = new google.maps.places.Autocomplete(input, options);
  }
  onSearch() {
    const { location, searchValue } = this.state;
    const searchInput = document.getElementById('searchInput');
    // unfocus input
    searchInput.blur();
    searchInput.value = '';

    this.props.search({ searchValue, location });
  }
  onInputChange(e) {
    let inputValue = e.target.value;

    if (e.target.value !== '') {
      // axios(searchOptions); 
      axios.post('/api/autocomplete', { text: e.target.value })
      .then(autoTerms => {
        this.setState({ 
          autocomplete: autoTerms.data,
          searchValue: inputValue,
        });
      })
      .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div className="col-md search-container">
        <form autoComplete="off" action="/search" method="post">
          <div className="form-group">
            <br/>
            <input id="locationInput" className="form-control" type="text" onChange={ (e) => this.setState({ location: e.target.value })} list="locationAutocompleteData" placeholder="Where to?"/>
            <input id="searchInput" className="form-control" type="text" onChange={ this.onInputChange } onKeyPress={ (e) => e.key === 'Enter' ? this.onSearch() : void 0 } list="autocompleteData" placeholder="What's happening?"/>
            <datalist id="autocompleteData">
              {
                this.state.autocomplete.map((term, index)=> <option key={ index }>{ term }</option>)
              }
            </datalist>
            <datalist id="locationAutocompleteData">
              {
                this.state.locationAutocomplete.map((term, index)=> <option key={ index }>{ term }</option>)
              }
            </datalist>
            <br/>
            <button type="button" onClick={ this.onSearch } className="btn btn-success">Search!</button>
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

