const models = require('../models/index');
const bcrypt = require('bcrypt');
const session = require('express-session');
const config = require('../config/config');
const moment = require('moment');
const nodemailer = require('nodemailer');

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
      type: '3',
    });
    const _technician = await models.Technician.create({
      user_id: _user.id,
      experience: req.body.experience,
      type: req.body.expertise,
      availability: true,
      workplace: req.body.workplace,
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

exports.requestsMadeByCustomers = async (req, res) => {
  try {
    const technicianId = req.session.userDetails.userId;

    const query1 = `
      SELECT t.type
      FROM "Technician" t
      JOIN "User" u ON u.id = t.user_id
      WHERE t.user_id = :technicianId
    `;

    const result = await models.sequelize.query(query1, {
      type: models.Sequelize.QueryTypes.SELECT,
      replacements: { technicianId }, // Parameter binding
    });

    const technicianType = result[0]?.type; // Access the first row's 'type'
    let technician = '';
    if (technicianType === 'mechanic') {
      technician = '4';
    }
    if (technicianType === 'fuelSupplier') {
      technician = '3';
    }
    if (technicianType === 'electrician') {
      technician = '2';
    }
    if (technicianType === 'bodyWorker') {
      technician = '1';
    }

    const query = `
   SELECT 
    r.completed AS "completed", 
    r.description AS "description", 
    r."startTime" AS "startTime", 
    s.name AS "serviceName", 
    u.name AS "requestingUser", 
    r.id AS "requestId",
    r.location AS "location"
    FROM 
    "Request" r
JOIN 
    "Service" s 
ON 
    r.service_id = s.id
JOIN 
    "User" u 
ON 
    r.requesting_user_id = u.id
WHERE 
    s."providerType" = :technician  
    AND r.completed IS NULL
ORDER BY 
    r."startTime" DESC;
    `;

    console.log('Executing query...');
    const data = await models.sequelize.query(query, {
      type: models.Sequelize.QueryTypes.SELECT,
      replacements: { technician },
    });

    if (!data || data.length === 0) {
      console.log('No data found for requests');
      return res.status(404).json({ message: 'No requests found.' });
    }

    console.log('Data retrieved successfully:', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error in requestsMadeByCustomers:', error);
    return res
      .status(500)
      .json({ message: 'An internal server error occurred.' });
  }
};

exports.getTechnician = async (req, res) => {
  try {
    const _user = await models.User.findOne({
      where: {
        id: req.session.userDetails.userId,
      },
    });
    const _technician = await models.Technician.findOne({
      where: {
        user_id: req.session.userDetails.userId,
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

exports.updateTechnician = async (req, res) => {
  try {
    // Extract data from the request body
    const data = req.body;
    console.log(data);
    // Validate and format the date of birth (DOB)
    if (data.dob) {
      const formattedDOB = moment(data.dob, 'DD/MM/YYYY', true);
      if (!formattedDOB.isValid()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date format. Please use DD/MM/YYYY.',
        });
      }
      data.dob = formattedDOB.format('YYYY-MM-DD'); // Convert to ISO format
    }

    // Update the User table
    const [userRowsUpdated] = await models.User.update(
      {
        name: data.name,
        email: data.email,
        address: data.address,
        contact: data.contact,
        dob: data.dob,
      },
      { where: { id: data.id } }
    );

    // Update the Technician table
    const [technicianRowsUpdated] = await models.Technician.update(
      {
        availability: data.availability,
        type: data.expertise,
        workplace: data.workplace,
      },
      { where: { user_id: data.id } }
    );
    req.session.userDetails.userName = data.name;
    // Check if any rows were updated in either table
    if (userRowsUpdated === 0 && technicianRowsUpdated === 0) {
      return res.status(404).json({
        success: false,
        message: 'No changes were made.',
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'User and technician information updated successfully.',
    });
  } catch (error) {
    // Handle errors
    console.error('Error updating technician:', error);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while updating the user. Please try again later.',
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const techId = req.session.userDetails.userId;
    const reqs = await models.Request.findAll({
      where: { providing_user_id: techId },
      attributes: ['id', 'requesting_user_id', 'startTime', 'service_id'],
    });
    let feedbacks = [];
    for (let i = 0; i < reqs.length; i++) {
      const feedback = await models.Feedback.findOne({
        where: { req_id: reqs[i].id },
        attributes: ['content', 'rating'],
      });
      if (feedback) {
        const service = await models.Service.findOne({
          where: { id: reqs[i].service_id },
          attributes: ['name'],
        });
        const custName = await models.User.findOne({
          where: { id: reqs[i].requesting_user_id },
          attributes: ['name'],
        });
        feedback.dataValues.serviceName = service.name;
        feedback.dataValues.name = custName.name;
        console.log(feedback.name, feedback.serviceName);
        feedbacks.push(feedback);
      }
    }
    console.log(feedbacks);

    return res.status(200).json({
      data: feedbacks,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTechnicianByReqId = async (req, res) => {
  try {
    const request = await models.Request.findOne({
      where: { id: req.body.reqId },
    });
    if (!request) {
      return res.status(400).json({
        message: 'Request Not Found.',
      });
    }
    const _user = await models.User.findOne({
      where: { id: request.providing_user_id },
    });
    if (!_user) {
      return res.status(400).json({
        message: 'Technician who facilitated this Request was Not Found.',
      });
    }
    res.status(200).json({
      message: 'Technician who facilitated this Request was Found.',
      _user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: 'Technician who facilitated this Request was Not Found.',
    });
  }
};

exports.getCurRequests = async (req, res) => {
  try {
    const userId = req.session.userDetails.userId;
    const sql =
      'SELECT r.id AS "reqId", u.name AS name, s.name AS "serviceName", r.description AS description, r."startTime" AS "startTime", r.location AS location FROM "Request" r JOIN "Service" s ON s.id = r.service_id JOIN "User" u ON u.id = r.requesting_user_id WHERE r.providing_user_id = :userId AND r.completed = false;';
    const data = await models.sequelize.query(sql, {
      type: models.Sequelize.QueryTypes.SELECT,
      replacements: { userId }, // Parameter binding
    });
    if (!data) {
      return res.status(400).json({
        message: 'Error while fetching Requests',
      });
    }
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error while fetching Requests',
    });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const data = await models.Request.update(
      {
        completed: true,
      },
      {
        where: { id: req.body.reqId },
      }
    );
    if (data) {
      return res.status(200).json({
        data,
        message: 'Successfully marked the Request Completed',
      });
    } else {
      return res.status(500).json({
        message: 'Error while trying to mark Completed.',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error while trying to mark Completed.',
    });
  }
};
exports.sendConfirmation = async (req, res) => {
  try {
    console.log('I did this now: ', req.params.id);
    const _req = await models.Request.findByPk(req.params.id);
    console.log('Email will be sent to him: ', _req.requesting_user_id);
    const _user = await models.User.findByPk(_req.requesting_user_id);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'apna.garage.2024@gmail.com',
        pass: config.database.appPassword,
      },
    });

    const mailOptions = {
      from: 'Apna Garage Team <apna.garage.2024@gmail.com>',
      to: _user.email,
      subject: 'Offer Received',
      text: `Dear User, you have an offer from a technician. Please login to view it`, // Plain text email
      html: `<body>

    <p>Dear User,</p>

    <p>You have received an offer from a technician. Please log into your account to view it.</p>

    <p><a href="http://127.0.0.1:5500/frontend/pages/login.html">Log into Your Account</a></p>

    <p>Best Regards,</p>
    <p>Apna Garage Team</p>

</body>`, // HTML version
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ data: 'Email sent' });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};
