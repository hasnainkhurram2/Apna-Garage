const models = require('../models/index');
const bcrypt = require('bcrypt');
const session = require('express-session');
const moment = require('moment');
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
      workplace: req.body.workplace,
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
    if (technicianType === 'mechanic')
    {
      technician = '4';
    }
    if (technicianType === 'fuelSupplier')
    {
      technician = '3';
    }
    if (technicianType === 'electrician')
    {
      technician = '2';
    }
    if (technicianType === 'bodyWorker')
    {
      technician = '1';
    }

    const query = `
   SELECT 
    r.completed AS "completed", 
    r.description AS "description", 
    r."startTime" AS "startTime", 
    s.name AS "serviceName", 
    u.name AS "requestingUser", 
    r.id AS "requestId"
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
      replacements : {technician},
    });

    if (!data || data.length === 0) {
      console.log('No data found for requests');
      return res.status(404).json({ message: 'No requests found.' });
    }

    console.log('Data retrieved successfully:', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error in requestsMadeByCustomers:', error);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

exports.getTechnician = async (req, res) => {
  try {
    const _user = await models.User.findOne({
      where: {
        id: req.session.userDetails.userId,
      },
    });
    const _technician = await models.Technician.findOne(
      {
        where : {
          user_id : req.session.userDetails.userId,
        },
      }
    );
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
