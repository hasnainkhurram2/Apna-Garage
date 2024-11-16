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
