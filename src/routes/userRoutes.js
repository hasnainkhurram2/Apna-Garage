const express = require('express');
const userController = require('./../controller/userController.js');

const router = express.Router();

router.route('/login').post(userController.login);

router.route('/getInfo').get(userController.getUser);

router.route('/resetPasswordEmail').post(userController.resetPasswordEmail);

router.route('/resetPassword').put(userController.updatePassword);

module.exports = router;
