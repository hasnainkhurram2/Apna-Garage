const models = require('../models/index');
const session = require('express-session');

exports.createRequest = async (req, res) => {
  try {
    const _service = await models.Service.findOne({
      where: { id: req.body.service_id },
    });
    if (!_service) {
      console.log('Service not found.');
      return res.status(400).json({});
    }
    const _request = await models.Request.create({
      location: req.body.location,
      description: req.body.content,
      startTime: req.body.startTime,
      service_id: req.body.service_id,
      requesting_user_id: req.session.userDetails.userId,
    });
    if (!_request) {
      return res.status(500).json({
        message: `Request Not Created. Error Occured.`,
      });
    }
    res.status(200).json({
      message: `Request Created Successfully!`,
      status: 'success',
    });
    console.log('Success');
  } catch (err) {
    res.status(500).json({
      message: `Error occured: ${err.message}`,
    });
    console.log(err);
  }
};
