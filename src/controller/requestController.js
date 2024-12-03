const models = require('../models/index');
const session = require('express-session');
const nodemailer = require('nodemailer');
const config = require('../config/config');
const { Op } = require('sequelize'); // Sequelize operator to handle exclusion

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
      completed: req.body.completed,
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

exports.getRequestById = async (req, res) => {
  try {
    // Extract requestId from URL parameters
    const requestId = req.query.requestId;
    console.log(requestId);
    if (!requestId) {
      return res.status(400).json({ error: 'requestId is required' });
    }

    // Query the database for the request by requestId
    const query = ` SELECT 
    u.name AS requestinguser,
    s.name AS name,
	r."startTime" AS "startTime",
    r.description AS description
FROM 
    "Request" r
JOIN 
    "User" u ON r.requesting_user_id = u.id
JOIN 
    "Service" s ON r.service_id = s.id
WHERE 
    r.id = :requestId;`; // Use named parameter
    const data = await models.sequelize.query(query, {
      replacements: { requestId }, // Use named parameter replacement
      type: models.Sequelize.QueryTypes.SELECT, // Use SELECT to fetch data
    });

    // Check if data is found
    if (data.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Send the fetched data as a response
    res.json(data[0]); // Return the first result
  } catch (error) {
    console.error('Error fetching request by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateOfferForRequest = async (req, res) => {
  try {
    console.log(req.body); // demand, description, requestId, techId
    const _offer = await models.Offer.create({
      demand: req.body.demand,
      tech_id: req.body.techId,
      description: req.body.description,
      req_id: req.body.requestId,
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateRequestAndNotifyTechnician = async (req, res) => {
  // controller that labels request as IN PROGRESS and notifies technician
  try {
    const requestId = req.query.requestId;
    const technicianId = req.query.technicianId;

    // Update the request to IN PROGRESS
    const [rowsUpdated] = await models.Request.update(
      {
        completed: false, // IN PROGRESS
        providing_user_id : technicianId,
      },
      { where: { id: requestId } }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({
        success: false,
        message: 'No changes were made. Request not found or already updated.',
      });
    }

    // Fetch request details and include associated Technician and Service
    const requestDetails = await models.Request.findOne({
      where: { id: requestId },
      include: [
        {
          model: models.Technician,
          as: 'Provider',
          attributes: ['user_id'],
        },
        {
          model: models.Service,
          as: 'service',
          attributes: ['name'],
        },
      ],
    });

    if (!requestDetails) {
      return res.status(404).json({
        success: false,
        message: 'Request details not found.',
      });
    }

    // Get the technician provider and service details
    const technician = requestDetails.Provider;
    const user = await models.User.findOne({
      where: { id: technician.user_id },
      attributes: ['name', 'email'],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Technician user details not found.',
      });
    }

    const technicianEmail = user.email;
    const technicianName = user.name;
    const serviceName = requestDetails.service.name;
    const requestDescription = requestDetails.description; // Assuming this field exists in the Request model

    // Send email to the assigned technician (the one selected for the request)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'apna.garage.2024@gmail.com',
        pass: config.database.appPassword,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: technicianEmail,
      subject: 'Service Request Update',
      html: ` 
        <h3>Service Request Update</h3>
        <p>Dear ${technicianName},</p>
        <p>The payment for the following service request has been processed, and you are now required to proceed with the service:</p>
        <ul>
          <li><strong>Service Name:</strong> ${serviceName}</li>
          <li><strong>Request Description:</strong> ${requestDescription}</li>
        </ul>
        <p>Please ensure timely completion of the request.</p>
        <p>Best regards,<br>Apna Garage Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Get technicians who gave an offer but were not selected (exclude the provider technician)
    const offerTechnicians = await models.Offer.findAll({
      where: { req_id: requestId, tech_id: { [Op.ne]: technician.user_id } }, // Exclude the selected technician
      attributes: ['tech_id'],
    });

    if (offerTechnicians.length > 0) {
      // Send an email to each technician who was not selected
      for (let offer of offerTechnicians) {
        const technicianUser = await models.User.findOne({
          where: { id: offer.tech_id },
          attributes: ['name', 'email'],
        });

        if (technicianUser) {
          const notSelectedEmail = technicianUser.email;
          const notSelectedName = technicianUser.name;

          const emailOptions = {
            from: process.env.EMAIL_USER,
            to: notSelectedEmail,
            subject: 'Service Request Update - Offer Not Selected',
            html: `
              <h3>Service Request Update</h3>
              <p>Dear ${notSelectedName},</p>
              <p>Thank you for your offer for the following service request. However, the request has been assigned to another technician. Here are the details of the request:</p>
              <ul>
                <li><strong>Service Name:</strong> ${serviceName}</li>
                <li><strong>Request Description:</strong> ${requestDescription}</li>
              </ul>
              <p>We appreciate your interest in providing the service, and we hope to work with you on future requests.</p>
              <p>Best regards,<br>Apna Garage Team</p>
            `,
          };

          await transporter.sendMail(emailOptions);
        }
      }
    }

    return res.status(200).json({
      success: true,
      message:
        'Request updated, email sent to the technician, and notifications sent to non-selected technicians.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while updating the request or sending the emails.',
    });
  }
};
