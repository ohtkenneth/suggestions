const path = require('path');
const helpers = require('./controllerHelpers');
const db = require('../db/db');
const yelp = require('./helpers/yelp');

module.exports = {
  signup: {
    // get(req, res) {
    //   res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    // },
    post(req, res) {
      const { email, password } = req.body;

      helpers.signUpUser({ email, password })
        .then(result => {
          if (result === 'invalid') {
            res.end('Email taken!');
          } else {
            req.session.isAuthenticated = true;
            req.session.email = email;
            res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
          } 
        });
    },
  },
  login: {
    get(req, res) {
      if (req.user) {
        req.logout();
      }
      
      res.redirect('/');
    },
    post(req, res) {
      const { email, password } = req.body;
      
      helpers.validateUser({ email, password })
        .then((result => {
          if (result === 'invalid') {
            // invalid credentials
            res.end('Wrong email or password!');
          } else {
            // sign user in
            req.session.isAuthenticated = true;
            req.session.email = email;
            res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
          }
        }));
    },
  },
  search: {
    post(req, res) {
      // use yelp api to get places
      const { location, searchTerm } = req.body;
      // req.body = { searchTerm, location }      
      // yelp.search(location, searchTerm, (err, results) => {
      //   if (err) {
          // if (err.code === 'LOCATION_NOT_FOUND') {
          //   res.end('Location not found!');
          // } else {
          //   console.log('ERROR from controller.js search()', err);
          // }
      //   }
      //   res.end(JSON.stringify(results.data));
      // });
      yelp.search(location, searchTerm)
        .then(results => {
          res.end(JSON.stringify(results.data));
        })
        .catch(err => {
          if (err.code === 'LOCATION_NOT_FOUND') {
            res.end('Location not found!');
          } else {
            console.log('ERROR from controller.js search()', err);
          }
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
  signout: {
    post(req, res) {
      res.end('signed out');
    }
  },
  home: {
    get(req, res) {
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    }
  },
  save: {
    get(req, res) {
      // email is on session
      if (!req.session.isAuthenticated) {
        // res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
        res.redirect('/')
      } else {
        db.getSavedItems({ email: req.session.email})
        .then(savedItems => {
          res.send((savedItems));
          res.end();
        })
        .catch(err => res.end(JSON.stringify(err)));
      }
    },
    post(req, res) {
      // email is on session
      db.saveItem({ email: req.session.email, item: req.body })
      .then(result => {
        res.end(JSON.stringify(result));
      })
      .catch(err => {
        console.log('ERROR SAVE ITEM', err);
        res.send(err);
      })
    }
  },
  logout: {
    get(req, res) {
      res.redirect(200, '/');
    },
    post(req, res) {
      req.session.destroy();
      // res.redirect(201, '/');
      res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
    },
  }
};