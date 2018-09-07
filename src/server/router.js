const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/')
.get(controller.index.get);

router.route('/signup')
.get(controller.signup.get)
.post(controller.signup.post);

router.route('/login')
.get(controller.login.get)
.post(controller.login.post);

router.route('/api/search')
.get(controller.search.get)
.post(controller.search.post);

router.route('/api/autocomplete')
.post(controller.autocomplete.post);

router.route('/api/auth')
.get(controller.auth.get);

router.route('/auth/google')
.get(controller.auth.google);

router.route('/auth/google/callback')
.get(controller.auth.googleCallback);

router.route('/signout')
.post(controller.signout.post);

router.route('/home')
.get(controller.home.get);

router.route('/api/save')
.get(controller.save.get)
.post(controller.save.post);

router.route('/logout')
.get(controller.logout.get)
.post(controller.logout.post);

module.exports = router;