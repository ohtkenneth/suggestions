const path = require('path');
const db = require('../db/db');
const yelp = require('../helpers/yelp');

module.exports = {
  index: {
    get(req, res) {
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    },
  },
  users: {
    get(req, res) {
      
    },
    post(req, res) {
      const userData = req.body;
      db.saveUser(userData)
      .then((msg) => res.end('User saved!'))
      .catch((err) => console.log('ERROR from controller.js users.save()', err));
    },
  },
  login: {
    get(req, res) {
      res.end('I should send back login page');
    },
    post(req, res) {
      const userData = req.body;
      db.getUser(userData)
      .then(results => {
        console.log(results);
        
        if (results === 'invalid') res.end(results);
        res.end(results);
      })
      .catch(err => console.log('ERROR from controller.js users.get()', err));
    },
  },
  search: {
    post(req, res) {
      // use yelp api to get places
      const { searchTerm } = req.body;
      
      yelp.search(searchTerm, (err, results) => {
        if (err) console.log('ERROR from controller.js search.post()', err), res.end();
        res.end(JSON.stringify(results.data));
      });
    }
  },
};