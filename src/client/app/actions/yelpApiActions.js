// import { search } from '../../utils/yelp';
import axios from 'axios';

function requestSearch(location, searchTerm) {
  return {
    type: 'REQUEST_YELP_SEARCH',
    payload: {
      location,
      searchTerm
    }
  };
}

function receiveSearchResults(payload) {
  return {
    type: 'RECEIVE_YELP_RESULTS',
    payload,
  }
}

function failedSearch(err) {
  return {
    type: 'FAILED_SEARCH',
    error: err,
  };
};

export function yelpSearch(location, searchTerm) {
  return dispatch => {
    dispatch(requestSearch(location, searchTerm));

    // post to express server
    const options = {
      url: '/api/search',
      method: 'post',
      data: {
        location,
        searchTerm
      }
    }
    axios(options)
      .then(results => {
        dispatch(receiveSearchResults({
          searchTerm,
          results: results.data,
        }));
      })
      .catch(err => {
        dispatch(failedSearch(err));
      })
  }
}