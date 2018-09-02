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

router.route('/search')
.get(controller.search.get)
.post(controller.search.post);

router.route('/autocomplete')
.post(controller.autocomplete.post);

router.route('/authenticate')
.get(controller.authenticate.get);

router.route('/authenticate/google')
.get(controller.authenticate.google);

router.route('/authenticate/google/callback')
.get(controller.authenticate.googleCallback);

router.route('/signout')
.post(controller.signout.post);

router.route('/home')
.get(controller.home.get);

router.route('/save')
.get(controller.save.get)
.post(controller.save.post);

router.route('/logout')
.get(controller.logout.get)
.post(controller.logout.post);

module.exports = router;