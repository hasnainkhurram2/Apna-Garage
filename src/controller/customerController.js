const models = require('../models/index');
const bcrypt = require('bcrypt');

exports.getRequestHistory = async (req, res) => {
  const temp = await models.Request_Service.findAll({
    where: {
      requesting_user_id: req.params.id,
    },
  });

  if (!temp) {
    res.status(404).json({
      error: 'No Requests Found.',
    });
    console.log('error');
  } else {
    res.status(200).json({
      status: 'successful',
      data: temp,
    });
    console.log('Success');
  }
};

exports.getRequest = async (req, res) => {
  const _reqId = req.params.reqId;
  const yourReq = await models.Request_Service.findByPk(_reqid);
  if (!yourReq) {
    res.status(404).json({
      error: 'could not find request with that user_id',
    });
  } else {
    res.status(200).json({
      data: yourReq,
    });
  }
};

//get a specific customer by ID:
exports.getCustomer = async (req, res) => {
  try {
    const customer = await models.User.findByPk(req.params.id); // Assuming "User" is the model for customers
    if (!customer) {
      return res.status(404).json({
        error: 'Customer not found.',
      });
    }
    res.status(200).json({
      status: 'successful',
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};

//function to update a customer:
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await models.User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });

    if (!updated) {
      return res.status(404).json({
        error: 'Customer not found.',
      });
    }

    res.status(200).json({
      status: 'successful',
      data: updated[1], // updated customer object
    });
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};

//function to delete a customer:
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await models.User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        error: 'Customer not found.',
      });
    }
    res.status(204).json({
      status: 'successful',
      data: null, // No data to return
    });
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(req.body);

    const _user = await models.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      dob: req.body.dob,
      address: req.body.address,
      contact: req.body.contact,
      type: '2',
    });

    const _customer = await models.Customer.create({
      user_id: _user.id,
      rating: 0,
      balance: 0,
    });
    res.status(200).json({
      status: 'success',
      data: _user,
    });
    console.log('Success');
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};

// function for retrieving feedback
exports.getFeedback = async (req, res) => {
  const _feedbackId = req.params.id; // Extract the feedback ID from the request URL.
  const feedback = await models.feedback.findByPk(_feedbackId);

  // If feedback with the given ID doesn't exist.
  if (!feedback) {
    res.status(404).json({
      error: 'Feedback not found with that ID',
    });
  } else {
    res.status(200).json({
      data: feedback,
    });
  }
};

//function for posting feedback
exports.provideFeedback = async (req, res) => {
  try {
    const content = req.body.content;

    // Validate input
    console.log(
      `Content: ${content}, Session: ${req.session.userDetails.userName}`
    );
    if (!content) {
      return res
        .status(400)
        .json({ message: 'User ID and content are required.' });
    }

    // Create feedback
    const feedback = await models.Feedback.create({
      user_id: req.session.userDetails.userId,
      content,
    });

    res.status(201).json({
      message: 'Feedback submitted successfully.',
      feedback,
    });
  } catch (error) {
    console.error('Error providing feedback:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while submitting feedback.', error });
  }
};

// function for posting payment of request
exports.payForRequest = async (req, res) => {
  try {
    const _request = await models.Request.create({
      location: req.session.reqDetails.location,
      description: req.session.reqDetails.description,
      startTime: req.session.reqDetails.startTime,
      service_id: req.session.reqDetails.service_id,
      completed: false,
      requesting_user_id: req.session.userDetails.userId,
    });
    if (!_request) {
      console.log('Request Lost.');
      return res.status(400).json({
        message: 'Oops, Something went wrong. Try Again Later.',
      });
    }
    const _payment = models.Payment.create({
      request_id: _request.id,
      paymentType: req.body.paymentType,
      amount: req.session.reqDetails.cost,
    });
    if (_payment) {
      delete req.session.reqDetails;
      res.status(200).json({
        message: 'Payment Successful! Redirrecting to your Dashboard.',
      });
    } else {
      res.status(400).json({
        message: 'Oops, Something went wrong. Try Again Later.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Oops, Something went wrong. Try Again Later.',
    });
  }
};
