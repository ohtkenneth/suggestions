const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/users')
.get(controller.users.get)
.post(controller.users.post);

router.route('/login')
.post(controller.login.post);

router.route('/search')
.post(controller.search.post);

module.exports = router;