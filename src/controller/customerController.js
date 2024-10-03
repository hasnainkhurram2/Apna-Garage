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

//get a specific customer by ID:
exports.getCustomer = async (req, res) => {
  try {
    const customer = await models.User.findByPk(req.params.id); // Assuming "User" is the model for customers
    if (!customer) {
      return res.status(404).json({
        error: "Customer not found.",
      });
    }
    res.status(200).json({
      status: "successful",
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error.",
    });
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
        error: "Customer not found.",
      });
    }

    res.status(200).json({
      status: "successful",
      data: updated[1], // updated customer object
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error.",
    });
  }
};

//function to delete a customer:
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await models.User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({
        error: "Customer not found.",
      });
    }

    res.status(204).json({
      status: "successful",
      data: null, // No data to return
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error.",
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
exports.payForRequest = async (req, res) => {};
