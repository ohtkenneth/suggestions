import { connect } from 'react-redux';
import Search from '../Search';
import { yelpSearch } from '../actions/yelpApiActions';

const mapStateToProps = state => {
  return {
    searches: state.yelpReducer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch(location, searchTerm) {
      dispatch(yelpSearch(location, searchTerm));
    }
  }
}

const VisibleSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default VisibleSearch;