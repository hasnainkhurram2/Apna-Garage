const express = require('express');
const technicianController = require('./../controller/technicianController.js');

const router = express.Router();

router.route('/signup').post(technicianController.signUp);

module.exports = router;
