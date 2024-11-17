const express = require('express');
const customerController = require('./../controller/customerController.js');

const router = express.Router();

router
  .route('/:id/requests')
  .get(customerController.getRequestHistory)
  .post(customerController.createRequest);

router.route('/:id/requests/:reqId').get(customerController.getRequest);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

router.route('/signup').post(customerController.signUp);

router.route('/').get(customerController.getAllUsers);

router
  .route('/:id/feedbacks')
  .get(customerController.getFeedback)
  .post(customerController.postCustomerFeedback);

router
  .route('/:id/request/:reqId/payments')
  .post(customerController.payForRequest);

module.exports = router;
