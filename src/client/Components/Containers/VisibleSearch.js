import { connect } from 'react-redux';
import Search from '../Search';
import { yelpSearch } from '../actions/yelpApiActions';

const mapDispatchToProps = dispatch => {
  return {
    onSearch(location, searchTerm) {
      dispatch(yelpSearch(location, searchTerm));
    }
  }
}

const VisibleSearch = connect(
  null,
  mapDispatchToProps
)(Search);

export default VisibleSearch;