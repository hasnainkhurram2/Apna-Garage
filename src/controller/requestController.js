const models = require('../models/index');
const session = require('express-session');

exports.createRequest = async (req, res) => {
  try {
    const _service = await models.Service.findOne({
      where: { id: req.body.service_id },
    });
    if (!_service) {
      console.log('Service not found.');
      return res.status(400).json({
        error: err.message,
      });
    }
    let cost = 0;
    if (_service.providerType === '3') {
      //is a Fuel Supplier's job, then we need to calculate the cost as service table has cost per liter.
      const perLiter = +_service.cost;
      const quantity = +req.body.content;
      cost = quantity * perLiter;
    } else {
      cost = +_service.cost;
    }
    const reqDetails = {
      location: req.body.location,
      description: req.body.content,
      startTime: req.body.startTime,
      completed: false,
      service_id: req.body.service_id,
      requesting_user_id: req.session.userDetails.userId,
      cost,
    };
    req.session.reqDetails = reqDetails;
    res.status(200).json({
      status: 'success',
    });
    console.log('Success');
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};
