const models = require('../models/index');
const bcrypt = require('bcrypt');

exports.createRequest = async (req, res) => {};

exports.getRequestHistory = async (req, res) => {
  const temp = await models.Request_Service.findAll({
    where: {
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
      name: req.body.fullName,
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
    const userDetails = {
      userId: _user.id,
      userType: '2',
      userName: _user.name,
    };
    req.session.userDetails = userDetails;
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

exports.getAllUsers = async (req, res) => {
exports.getAllUsers = async (req, res) => {
  const temp = await models.User.findAll();
  if (temp) {
    res.status(200).json({
      status: 'success',
      data: temp,
    });
    console.log('Success in retrieving All Users.');
  } else {
    res.status(404).json({
      status: 'Fail',
    });
    console.log('Fail to retrieve Users.');
  }
};
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
exports.postCustomerFeedback = async (req, res) => {};
exports.postCustomerFeedback = async (req, res) => {};

// function for posting payment of request
exports.payForRequest = async (req, res) => {};
