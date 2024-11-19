const models = require('../models/index');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const config = require('../config/config');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const _user = await models.User.findOne({ where: { email } });
    if (_user) {
      const isMatch = await bcrypt.compare(password, _user.password);
      if (isMatch) {
        const userDetails = {
          userName: _user.name,
          userId: _user.id,
          userType: _user.type,
        };
        req.session.userDetails = userDetails;
        res.status(200).json({
          status: 'success',
          message: `Login Successful! Welcome ${_user.name}!`,
          userDetails: req.session.userDetails,
        });
        console.log(`Success! ${_user.name}`);
      } else {
        res.status(500).json({
          status: 'Failed',
          message: 'Incorrect Password.',
        });
        console.log('Fail! Incorrect Password.');
      }
    } else {
      res.status(404).json({
        status: 'Fail',
        message: 'No User found with Email ',
        email,
      });
      console.log('Fail!, Invalid Credentials');
    }
  } catch (err) {
    res.status(500).json({
      error: 'Server error.',
    });
    console.log(err);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email', // Replace with your email
        pass: config.database.appPassword, // Replace with your app password
      },
    });

    const resetLink =
      'C:UsersHpDesktopApna-Garage/frontendpages/resetPassword.html';
    // Email options
    const mailOptions = {
      from: 'hasnain.khurram2019@gmail.com', // Your email
      to: req.params.id, // Recipient's email
      subject: 'Reset Your Password',
      text: `Click the link to reset your password: ${resetLink}`, // Plain text email
      html: `<p>Click the link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`, // HTML version
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully!');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Oops, Something went wrong. Try Again Later.',
    });
  }
};
