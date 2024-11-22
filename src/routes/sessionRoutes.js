const express = require('express');
const sessionController = require('./../controller/sessionController.js');

const router = express.Router();

router.route('/').get(sessionController.getSessionData);
router.route('/setReq').post(sessionController.setReqId);

module.exports = router;
