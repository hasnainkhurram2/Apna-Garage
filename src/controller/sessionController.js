const models = require('../models/index');
const session = require('express-session');

exports.getSessionData = async (req, res) => {
  console.log(`Dashboard Session: ${req.session.userDetails}.`);
  if (!req.session.userDetails) {
    console.log('Failed');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({
    userDetails: req.session.userDetails,
    reqDetails: req.session.reqDetails,
  });
};


exports.setReqId = async (req, res) => {
     
  try
  { 
    req.session.reqDetails.reqId = req.body.reqId;
    return res.status(200);
  }
  catch(error){
    console.log(error);
    return res.status(500);
  }

}