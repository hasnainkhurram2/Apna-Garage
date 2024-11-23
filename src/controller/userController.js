const models = require('../models/index');
const bcrypt = require('bcrypt');

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

exports.getUser = async (req, res) => {
  try {
    const _user = await models.User.findOne({
      where: {
        id: req.session.userDetails.userId,
      },
    });
    res.status(200).json({
      _user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Oops, Something went wrong. Session Expired. Redirecting to Login`,
    });
  }
};
