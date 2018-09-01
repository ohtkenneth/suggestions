const path = require('path');
const db = require('../db/db');
const yelp = require('../helpers/yelp');

module.exports = {
  index: {
    get(req, res) {
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    },
  },
  signup: {
    get(req, res) {
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    },
    post(req, res) {
      const userData = req.body;
      db.saveUser(userData)
      .then((msg) => res.end('User saved!'))
      .catch((err) => {
        if (err === 'email taken') {
          res.end('Email taken');
        } else {
          console.log('ERROR from controller.js signup.save()', err)
        }
      });
    },
  },
  login: {
    get(req, res) {
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    },
    post(req, res) {
      const userData = req.body;

      db.getUser(userData)
      .then(results => {
        console.log(results);
        if (results === 'invalid') {
          res.end(results);
        } else {
          // user authenticated (results === 'success')
          req.session.isAuth = 'authenticated';
          console.log(req.session);
          res.end(results);
        }
      })
      .catch(err => {
        if (err == 'invalid') {
          console.log('invalid!');
          res.end('invalid');
        } else {
          console.log('ERROR from controller.js users.get()', err)
        }
      });
    },
  },
  search: {
    post(req, res) {
      // use yelp api to get places
      const { searchTerm } = req.body;

      yelp.search(searchTerm, (err, results) => {
        if (err) {
          if (err.code === 'LOCATION_NOT_FOUND') {
            res.end('Location not found!');
          } else {
            console.log('ERROR from controller.js search()', err);
          }
        }
        res.end(JSON.stringify(results.data));
      });
    },
  },
  autocomplete: {
    post(req, res) {
      const { text } = req.body;
      yelp.autocomplete(text, (err, autoTerms) => {
        if (err) console.log('ERROR from contoller.js autocomplete.post()', err);
        else res.end(JSON.stringify(autoTerms));
      });
    }
  },
  authenticate: {
    get(req, res) {
      if (req.session.isAuthenticated) {
        res.end(true);
      }
      res.end(false);
    },
    post(req, res) {
      req.session.destroy();
      res.end('signed out');
    }
  },
};