const express = require('express');
const userController = require('./../controller/userController.js');

const router = express.Router();

router.route('/login').post(userController.login);

module.exports = router;
