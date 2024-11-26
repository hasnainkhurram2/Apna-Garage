const express = require('express');
const userController = require('./../controller/userController.js');

const router = express.Router();

router.route('/login').post(userController.login);

router.route('/getInfo').get(userController.getUser);

router.route('/resetPasswordEmail').post(userController.resetPasswordEmail);

router.route('/resetPassword').put(userController.updatePassword);

router.route('/sendCode').post(userController.sendVerificationCode);

router.route('/updateInfo').put(userController.updateUser);

router.route('/').delete(userController.deleteCustomer);
module.exports = router;
