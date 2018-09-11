import { search } from '../../helpers/yelp';

function requestSearch(searchTerm) {
  return {
    type: 'REQUEST_YELP_SEARCH',
    payload: searchTerm,
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
    dispatch(requestSearch(searchTerm));

    search(location, searchTerm)
      .then(results => {
        receiveSearchResults({
          searchTerm,
          results: results.data,
        });
        console.log(results.data);
      })
      .catch(err => {
        dispatch(failedSearch(err));
      })
  }
}