const express = require('express');
const adminController = require('./../controller/adminController.js');

const router = express.Router();

router.route('/users/:id/accept').put(adminController.acceptWorker);

router.route('/users/:id/reject').delete(adminController.rejectWorker);

router.route('users/:id/delete').delete(adminController.deleteAnyUser);

router.route('/feedbacks').get(adminController.getAllFeedbacks);

module.exports = router;
