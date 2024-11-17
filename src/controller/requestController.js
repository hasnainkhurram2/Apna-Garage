const models = require('../models/index');
const session = require('express-session');

exports.createRequest = async (req, res) => {
  try {
    console.log(req.session.userId);

    const _request = await models.User.create({
      requestedBy: req.session.userId,
      acceptedBy: null,
      location: req.body.location,
      startTime: req.body.startTime,
      expectedTime: null,
      completed: false,
      endTime: null,
    });

    res.status(200).json({
      status: 'success',
      data: _request,
    });
    console.log('Success');
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};
