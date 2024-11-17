const express = require('express');
const requestController = require('./../controller/requestController.js');

const router = express.Router();

router.route('/').post(requestController.createRequest);
module.exports = router;
