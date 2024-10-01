const express = require("express");
const customerController = require("./../controller/customerController.js");

const router = express.Router();

router.route("/:id/requests").get(customerController.getRequestHistory);

router.route("/:id/requests").post(customerController.createRequest);

router.route("/:id/requests/:reqId").get(customerController.getRequest);

module.exports = router;
