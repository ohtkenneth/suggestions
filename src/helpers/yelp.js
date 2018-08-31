const axios = require('axios');
const querystring = require('querystring');
const yelpApiKey = require('../config/yelpConfig');

axios.defaults.baseURL = 'https://api.yelp.com/v3/businesses/';
axios.defaults.headers.common['Authorization'] = `Bearer ${yelpApiKey}`;

module.exports = {
  search(searchTerm, cb) {
    console.log('SEARCH TERM', searchTerm)
    axios.get('search', { params: { location: searchTerm }})
    .then(results => cb(null, results))
    .catch(err => cb(err, null));
  },
};