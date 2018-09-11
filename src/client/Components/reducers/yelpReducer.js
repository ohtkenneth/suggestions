const initialState = {
  // key value pairs of search term / results
}

function yelpReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_YELP_RESULTS':
      return Object.assign({}, state, {
        [action.payload.searchTerm]: action.payload.results,
      });
      break;
    default:
      return state;
  }
}

export default yelpReducer;