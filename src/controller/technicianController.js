const models = require('../models/index');
const bcrypt = require('bcrypt');
const session = require('express-session');
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
    console.log('Processing customer requests');
    const query = `
      SELECT 
        r.completed AS completed, 
        r.description AS description, 
        r."startTime" AS "startTime", 
        s.name AS name, 
        u.name AS requestingUser,
        r.id AS id
      FROM 
        "Request" AS r 
      JOIN 
        "Service" AS s 
      ON 
        r.service_id = s.id 
      JOIN 
        "User" AS u 
      ON 
        r.requesting_user_id = u.id 
      ORDER BY 
        r."startTime" DESC;
    `;

    console.log('Executing query...');
    const data = await models.sequelize.query(query, {
      type: models.Sequelize.QueryTypes.SELECT,
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

