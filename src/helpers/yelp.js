const axios = require('axios');
const querystring = require('querystring');
const yelpApiKey = require('../config/keys').yelp;

module.exports = {
  search(searchData, cb) {
    console.log('SEARCH DATA', searchData);
    const searchOptions = {
      url: 'https://api.yelp.com/v3/businesses/search',
      method: 'get',
      params: {
        term: searchData.searchValue,
        location: searchData.location,
      },
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
        'Content-Type': 'application/json',
      }
    };
    axios(searchOptions)
    .then(results => cb(null, results))
    .catch(err => cb(err, null));
  },
  autocomplete(text, cb) {
    const searchOptions = {
      url: 'https://api.yelp.com/v3/autocomplete',
      method: 'get',
      params: {
        text,
      },
      headers: {
        Authorization: `Bearer ${yelpApiKey}`,
      }
    };
    console.log('AUTOCOMPLETE')

    axios(searchOptions)
    .then(results => {
      // get aliases, then businesses, then terms
      let autoTerms = [];
      autoTerms.push(...results.data.categories.map(category => category.alias));
      autoTerms.push(...results.data.businesses);
      autoTerms.push(...results.data.terms.map(term => term.text));

      cb(null, autoTerms);
    })
    .catch(err => cb(err, null));
  },
};

// autocomplete api results
// {
//   "categories": [
//       {
//           "alias": "hiking",
//           "title": "Hiking"
//       },
//       {
//           "alias": "parks",
//           "title": "Parks"
//       },
//       {
//           "alias": "mountainbiking",
//           "title": "Mountain Biking"
//       }
//   ],
//   "businesses": [],
//   "terms": [
//       {
//           "text": "Hikes With Dogs"
//       },
//       {
//           "text": "Hikes With Waterfalls"
//       },
//       {
//           "text": "Best Hikes"
//       }
//   ]
// }