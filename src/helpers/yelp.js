const axios = require('axios');
const querystring = require('querystring');
const yelpApiKey = require('../config/yelpConfig');

module.exports = {
  search(searchTerm, cb) {
    const searchOptions = {
      url: 'https://api.yelp.com/v3/businesses/search',
      method: 'get',
      params: {
        location: searchTerm,
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
  autoComplete(input, cb) {
    // console.log(input);
    // axios.get('autocomplete', { params: { text: input }})
    // .then(results => {
    //   // get aliases, then businesses, then terms
    //   results = JSON.parse(results);
    //   let autoTerms = [];
      
    //   autoTerms.concat(results.categories.map(category => category.alias));
    //   autoTerms.concat(results.businesses);
    //   autoTerms.concat(results.terms);

    //   console.log(autoTerms);

    //   cb(null, autoTerms);
    // })
    // .catch(err => cb(err, null));
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