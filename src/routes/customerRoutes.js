const express = require('express');
const customerController = require('./../controller/customerController.js');

const router = express.Router();

router.route('/:id/requests').get(customerController.getRequestHistory);

router.route('/:id/requests/:reqId').get(customerController.getRequest);

router
  .route('/:id')
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

router.route('/signup').post(customerController.signUp);

router.route('/provideFeedback').post(customerController.provideFeedback);

router.route('/payment').post(customerController.payForRequest);

router.route('/reqHistory').get(customerController.getCustomerRequests);

module.exports = router;
