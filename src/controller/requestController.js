const models = require('../models/index');
const session = require('express-session');

exports.createRequest = async (req, res) => {
  try {
    console.log(req.session.userDetails.userId);

    const _request = await models.Request.create({
      //   acceptedBy: null,
      location: req.body.location,
      description: req.body.content,
      startTime: req.body.startTime,
      completed: false,
      requesting_user_id: req.session.userDetails.userId,
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
