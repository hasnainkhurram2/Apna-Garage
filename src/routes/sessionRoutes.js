const express = require('express');
const sessionController = require('./../controller/sessionController.js');

const router = express.Router();

router.route('/').get(sessionController.getSessionData);


module.exports = router;
