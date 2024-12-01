const models = require('../models/index');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
      request_id: req.query.requestId,
      paymentType: req.body.paymentType,
      amount: req.body.amount,
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
  try {
    const customerId = req.query.userId;
    // // console.log(customerId);    correctly received
    const query = `
  SELECT 
    r.id AS request_id,
    r.description AS request_description,
    o.description AS offer_description,
    o.demand AS offer_demand,
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
    r.requesting_user_id = :customerId AND r.providing_user_id IS NULL

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
    return res
      .status(500)
      .json({ message: 'An internal server error occurred.' });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    console.log(req.body.email);

    const verCode = crypto.randomBytes(4).toString('hex');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'apna.garage.2024@gmail.com',
        pass: config.database.appPassword,
      },
    });

    // Email options
    const mailOptions = {
      from: 'Apna Garage Team <apna.garage.2024@gmail.com>',
      to: req.body.email,
      subject: 'OTP Verification.',
      text: `Type the following code in the dialogue box to Verify Your OTP: ${verCode}`, // HTML version
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: `OTP sent at ${req.body.email}`,
      verCode,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: `Error while trying to send OTP. ${error.message}`,
    });
  }
};

exports.viewTechnician = async (req, res) => {
  const technicianId = req.query.techId;
  try {
    const _user = await models.User.findOne({
      where: {
        id: technicianId,
      },
    });
    const _technician = await models.Technician.findOne({
      where: {
        user_id: technicianId,
      },
    });
    res.status(200).json({
      _user,
      _technician,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Oops, Something went wrong. Session Expired. Redirecting to Login`,
    });
  }
};

exports.updateProvidingUserId = async (req, res) => {
  try {
    const { technicianId, requestId } = req.body;

    if (!technicianId || !requestId) {
      return res.status(400).json({ error: 'An error occurred' });
    }

    // Update the providing_user_id in the Request table
    const updatedRequest = await models.Request.update(
      { providing_user_id: technicianId },
      {
        where: {
          id: requestId,
        },
      }
    );

    if (updatedRequest[0] === 0) {
      // Check if any rows were updated
      return res
        .status(404)
        .json({ error: 'Request not found or no changes made' });
    } else {
      res.status(200).json({ message: 'Request updated successfully' });
    }
  } catch (error) {
    console.error('Error updating providing_user_id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.sendInvoiceToCustomer = async (req, res) => {
  try {
    // Retrieve userId from session
    const userId = req.session.userDetails.userId;

    if (!userId) {
      return res.status(400).json({ error: 'User is not logged in' });
    }

    // Fetch the user's email
    const user = await models.User.findOne({ where: { id: userId } });

    if (!user || !user.email) {
      return res
        .status(404)
        .json({ error: 'User not found or email is missing' });
    }

    const customerEmail = user.email;

    // Extract invoice details from request body
    const {
      requestId,
      serviceName,
      requestDescription,
      technicianId,
      technicianName,
      offerDemand,
      offerDescription,
    } = req.body;

    // Validate that required fields are provided
    if (
      !requestId ||
      !serviceName ||
      !technicianId ||
      !technicianName ||
      !offerDemand
    ) {
      return res
        .status(400)
        .json({ error: 'Missing required fields in the request body' });
    }
    const user1 = await models.User.findOne({
      where: { id: technicianId },
      attributes: ['email', 'contact'],
    });
    // Construct the payment page URL
    const paymentPageUrl = `http://127.0.0.1:5500/Apna-Garage/frontend/pages/paymentPage.html?requestId=${requestId}&demand=${encodeURIComponent(
      offerDemand
    )}`;
    const technicianContact = user1.contact;
    const technicianEmail = user1.email;
    // Create email content
    const emailHtml = `
          <h1>Apna Garage - Service Invoice</h1>
          <p>Dear ${user.name},</p>
          <p>Thank you for using Apna Garage! Below are the details of your recent service request:</p>
          <table border="1" cellspacing="0" cellpadding="8">
              <tr>
                  <th>Request ID</th>
                  <td>${requestId}</td>
              </tr>
              <tr>
                  <th>Service Name</th>
                  <td>${serviceName}</td>
              </tr>
              <tr>
                  <th>Request Description</th>
                  <td>${requestDescription || 'Not Provided'}</td>
              </tr>
              <tr>
                  <th>Technician ID</th>
                  <td>${technicianId}</td>
              </tr>
              <tr>
                  <th>Technician Name</th>
                  <td>${technicianName}</td>
              </tr>
               <tr>
                  <th>Technician Contact Number</th>
                  <td>${technicianContact}</td>
              </tr>
                <tr>
                  <th>Technician Email</th>
                  <td>${technicianEmail}</td>
              </tr>
              <tr>
                  <th>Offer Demand</th>
                  <td>${offerDemand}</td>
              </tr>
              <tr>
                  <th>Offer Description</th>
                  <td>${offerDescription}</td>
              </tr>
          </table>
          <p>To proceed with the payment for this service, please click the link below:</p>
          <p><a href="${paymentPageUrl}" target="_blank">Pay Now</a></p>
          <p>We hope the service met your expectations. If you have any feedback or concerns, please don't hesitate to reach out.</p>
          <p>Best regards,</p>
          <p><b>Apna Garage Team</b></p>
      `;

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'apna.garage.2024@gmail.com',
        pass: config.database.appPassword,
      },
    });

    // Define mail options
    const mailOptions = {
      from: '"Apna Garage" <apna.garage.2024@gmail.com>',
      to: customerEmail,
      subject: `Invoice ID: ${requestId}`,
      html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: %s', info.messageId);
    res.status(200).json({ message: 'Invoice sent successfully!' });
  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
