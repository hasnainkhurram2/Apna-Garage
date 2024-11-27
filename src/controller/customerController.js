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
      'SELECT r.completed as completed, r.description as description, r."startTime" as "startTime", s.name as name FROM "Request" as r JOIN "Service" as s ON r.service_id = s.id WHERE r.requesting_user_id = :userId ORDER BY r."startTime" DESC;';
    const data = await models.sequelize.query(query, {
      replacements: { userId },
      type: models.Sequelize.QueryTypes.SELECT,
    });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: 'No requests found for this user.' });
    }
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


exports.getOffersForRequests = async (req, res) => {
 
    const customerId = req.query.userId;
   // // console.log(customerId);    correctly received
   try {
    
    const customerId = req.query.userId;
    // // console.log(customerId);    correctly received
    const query = `
    SELECT 
    r.id AS request_id,
    r.description AS request_description,
    u.id AS technician_id,
    u.name AS technician_name,
	s.name AS service_name
FROM 
    "Request" r
JOIN 
    "Offer" o ON r.id = o.req_id
JOIN 
    "User" u ON o.tech_id = u.id
JOIN 
	"Service" s ON r.service_id = s.id
WHERE 
    r.requesting_user_id = :customerId;

    `;
  
    console.log('Executing query...');
    const data = await models.sequelize.query(query, {
      type: models.Sequelize.QueryTypes.SELECT,
      replacements: { customerId }, // Parameter binding
    });
  
  

    if (!data || data.length === 0) {
      console.log('No offers found');
      return res.status(404).json({ message: 'No offers found.' });
    }

    console.log('Data retrieved successfully:', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error in getOffersForRequests:', error);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }

};