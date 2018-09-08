const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passportConfig');

const authController = require('./authController');
// OAUTH ROUTES
// app.get('/api/auth/google', passport.authenticate('google', {scope: ['profile']}))
// app.get('/api/auth/google/callback', passport.authenticate('google'), (req, res) => {
//   res.send('you google authed!');
//   }
// )
// get(req, res) {
//   if (req.session.isAuthenticated) {
//     res.end('true');
//   }
//   res.end('false');
// },
// post(req, res) {
//   req.session.destroy();
//   res.end('signed out');
// },

router.get('/', (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.send('true');
  } else {
    res.send('false');
  }
});

router.post('/', (req, res) => {
  console.log('adfa')
})

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