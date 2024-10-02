const models = require("../models/index");

exports.createRequest = async (req, res) => {};

exports.getRequestHistory = async (req, res) => {
  const temp = await models.Request_Service.findAll({
    where: {
      requesting_user_id: req.params.id,
    },
  });

  if (!temp) {
    res.status(404).json({
      error: "No Requests Found.",
    });
    console.log("error");
  } else {
    res.status(200).json({
      status: "successful",
      data: temp,
    });
    console.log("Success");
  }
};

exports.getRequest = async (req, res) => {
  const _reqId = req.params.reqId;
  const yourReq = await models.Request_Service.findByPk(_reqid);
  if (!yourReq) {
    res.status(404).json({
      error: "could not find request with that user_id",
    });
  } else {
    res.status(200).json({
      data: yourReq,
    });
  }
};

exports.login = async (req, res) => {};

exports.signUp = async (req, res) => {};

exports.getAllUsers = async (req, res) => {
  const temp = await models.User.findAll();

  res.status(200).json({
    status: "success",
    data: temp,
  });
};

// function for retrieving feedback
exports.getFeedback = async (req, res) => {};

//function for posting feedback
exports.postCustomerFeedback = async (req, res) => {};

// function for posting payment of request
exports.paymentForRequest = async (req, res) => {};
