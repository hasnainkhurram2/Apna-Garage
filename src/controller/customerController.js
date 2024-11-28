const models = require('../models/index');
const bcrypt = require('bcrypt');
const config = require('../config/config');

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
exports.getCustomerRequests = async (req, res) => {
  try {
    // Step 1: Extract userId from session
    const userId = req.session.userDetails.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'User not logged in or session invalid.' });
    }

    const query =
      'SELECT r.id as "reqId", r.completed as completed, r.description as description, r."startTime" as "startTime", s.name as name FROM "Request" as r JOIN "Service" as s ON r.service_id = s.id WHERE r.requesting_user_id = :userId ORDER BY r."startTime" DESC;';
    const data = await models.sequelize.query(query, {
      replacements: { userId },
      type: models.Sequelize.QueryTypes.SELECT,
    });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: 'No requests found for this user.' });
    }
    for (let i = 0; i < data.length; i++) {
      const feedId = await models.Feedback.findOne({
        where: { req_id: data[i].reqId },
        attributes: ['id'],
      });
      if (feedId) {
        data[i].feedId = feedId.id;
        console.log(data[i].feedId);
      }
    }
    console.log(data[1].feedId);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching requests and services:', error);
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching data.' });
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
      message: err.message,
    });
    console.log(err);
  }
};

//function for posting feedback
exports.provideFeedback = async (req, res) => {
  try {
    const content = req.body.content;
    const rating = req.body.rating;
    // Validate input
    console.log(
      `Content: ${content}, Session: ${req.session.userDetails.userName}`
    );
    if (!content) {
      return res.status(400).json({ message: 'Feedback Content is required.' });
    }
    if (!rating) {
      return res.status(400).json({ message: 'Rating is required.' });
    }

    // Create feedback
    const feedback = await models.Feedback.create({
      req_id: req.body.reqId,
      content,
      rating,
    });
    if (!feedback) {
      return res.status(500).json({
        message: 'Something went wrong while creating Feedback.',
      });
    }
    const request = await models.Request.findOne({
      where: { id: req.body.reqId },
    });
    if (!request) {
      return res.status(500).json({
        message: 'Something went wrong while Finding Request.',
      });
    }
    const technician = await models.Technician.findOne({
      where: { user_id: request.providing_user_id },
    });
    if (!technician) {
      return res.status(500).json({
        message: 'Something went wrong while find Technician.',
      });
    }
    const techId = technician.user_id;
    const sql =
      'SELECT COUNT(*) AS count FROM "Request" r JOIN "Feedback" f ON f.req_id = r.id WHERE r.providing_user_id = :techId';

    const data = await models.sequelize.query(sql, {
      replacements: { techId },
      type: models.Sequelize.QueryTypes.SELECT,
    });
    if (!data) {
      return res.status(500).json({
        message: 'Something went wrong while counting feedbacks',
      });
    }
    let count = null;
    if (data === undefined || data === null) {
      count = 1;
    } else {
      count = +data[0].count;
    }
    const oldRating = +technician.rating;
    const curRating = +req.body.rating;
    const newRating = (oldRating + curRating) / count;

    await models.Technician.update(
      { rating: newRating },
      { where: { user_id: technician.user_id } }
    );

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
    const _payment = models.Payment.create({
      request_id: req.session.reqDetails.reqId,
      paymentType: req.body.paymentType,
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
