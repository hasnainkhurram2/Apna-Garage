const express = require('express');
const technicianController = require('./../controller/technicianController.js');

const router = express.Router();

router.route('/signup').post(technicianController.signUp);

router
  .route('/technicianrequests')
  .get(technicianController.requestsMadeByCustomers);

router.route('/technicianProfile').get(technicianController.getTechnician);

router
  .route('/updateTechnicianInfo')
  .put(technicianController.updateTechnician);

router.route('/feedbacks').get(technicianController.getFeedbacks);
router
  .route('/sendConfirmation/:id')
  .get(technicianController.sendConfirmation);

module.exports = router;
