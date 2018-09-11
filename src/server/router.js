const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/signup')
// .get(controller.signup.get)
.post(controller.signup.post);

router.route('/login')
.post(controller.login.post);

router.route('/search')
.post(controller.search.post);

router.route('/autocomplete')
.post(controller.autocomplete.post);

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