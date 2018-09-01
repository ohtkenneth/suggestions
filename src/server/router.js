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
.post(controller.search.post);

router.route('/autocomplete')
.post(controller.autocomplete.post);

router.route('/authenticate')
.get(controller.authenticate.get);

module.exports = router;