const express = require("express");
const customerController = require("./../controller/customerController.js");

const router = express.Router();

router.route("/:id/requests")
 .get(customerController.getRequestHistory)
 .post(customerController.createRequest);

router.route("/:id/requests/:reqId").get(customerController.getRequest);

router.route("/:id")
 .get(customerController.getCustomer)
 .put(customerController.updateCustomer)
 .delete(customerController.deleteCustomer);

router.route("/login").post(customerController.login);

router.route("/signup").post(customerController.signUp);

router.route("/").get(customerController.getAllUsers);

module.exports = router;
