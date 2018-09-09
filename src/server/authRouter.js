const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passportConfig');

const authController = require('./authController');

router.get('/', (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.send('true');
  } else {
    res.send('false');
  }
});

router.post('/',
  passport.authenticate('local'),
  (req, res) => {
    console.log('user session', req.user)
    res.redirect('/');
  }
)

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.route('/google')
.get(passport.authenticate('google', {scope: ['profile']}));

// router.use('/google/callback', )
router.use('/google/callback', passport.authenticate('google'));
router.get('/google/callback', (req, res) => {
  res.redirect('/');
});

module.exports = router;