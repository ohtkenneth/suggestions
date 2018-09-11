const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passportConfig');

const authController = require('./authController');

// Router.js authenticator
router.get('/', (req, res) => {
  console.log('USER', req.user);
  const options = req.user ? true : false;
  res.send(options);
});

// login post with local email / password
router.post('/',
  passport.authenticate('local'),
  (req, res) => {
    console.log('redirecting upon success login', req.user);
    res.redirect('/');
  }
);

router.post('/logout', (req, res) => {
  // destroy session
  req.logout();
  res.redirect('/');
});

// google strategy
router.route('/google')
.get(passport.authenticate('google', {scope: ['profile']}));

// router.use('/google/callback', )
router.use('/google/callback', passport.authenticate('google'));
router.get('/google/callback', (req, res) => {
  res.redirect('/');
});

module.exports = router;