const path = require('path');
const db = require('../db/db');
const yelp = require('../helpers/yelp');
const googleAuth = require('../helpers/googleAuth');

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
      .then((msg) => {
        req.session.isAuthenticated = true;
        req.session.email = userData.email;
        console.log(req.session);
        // res.redirect('/', 201);
        // res.redirect(201, '/search')
        res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
      })
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
      // res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
      res.redirect('/');
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
          req.session.isAuthenticated = true;
          req.session.email = userData.email;
          console.log(req.session);
          // res.redirect('/', 201);
          // res.redirect(201, '/search')
          res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
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
    get(req, res) {
      // res.sendFile(path.join(__dirname, '/../../dist', 'index.html'));
      res.redirect('/');
    },
    post(req, res) {
      // use yelp api to get places
      // const { searchTerm } = req.body;
      // req.body = { searchTerm, location }
      yelp.search(req.body, (err, results) => {
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
  signout: {
    post(req, res) {
      req.session.destroy()
      console.log('req session', req.session);
      res.end('signed out');
    }
  },
  authenticate: {
    get(req, res) {
      if (req.session.isAuthenticated) {
        res.end('true');
      }
      res.end('false');
    },
    post(req, res) {
      req.session.destroy();
      res.end('signed out');
    },
    google(req, res) {
      console.log('authenticating with google...');
      googleAuth.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login'],
      });
    },
    googleCallback(req, res) {
      console.log('google auth callback');
      googleAuth.authenticate('google', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      }
    },
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