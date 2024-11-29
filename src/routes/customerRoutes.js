const express = require('express');
const customerController = require('./../controller/customerController.js');
const customer = require('../models/customer.js');

const router = express.Router();

router.route('/:id/requests').get(customerController.getRequestHistory);

router.route('/:id/requests/:reqId').get(customerController.getRequest);

router.route('/:id').put(customerController.updateCustomer);
// .delete(customerController.deleteCustomer);

router.route('/signup').post(customerController.signUp);

router.route('/provideFeedback').post(customerController.provideFeedback);

router.route('/payment').post(customerController.payForRequest);

router.route('/reqHistory').get(customerController.getCustomerRequests);

router.route('/offer').get(customerController.getOffersForRequests);

router.route('/technician').get(customerController.viewTechnician);

router.route('/requestAccepted').post(customerController.updateProvidingUserId);

router.route('/invoice').post(customerController.sendInvoiceToCustomer)
module.exports = router;
