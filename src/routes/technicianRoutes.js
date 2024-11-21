const express = require('express');
const technicianController = require('./../controller/technicianController.js');

const router = express.Router();

router.route('/signup').post(technicianController.signUp);

router.route('/technicianrequests').get(technicianController.requestsMadeByCustomers);

module.exports = router;
