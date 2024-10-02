const express = require("express");
const customerController = require("./../controller/customerController.js");

const router = express.Router();

router.route("/:id/requests").get(customerController.getRequestHistory);

router.route("/:id/requests").post(customerController.createRequest);

router.route("/:id/requests/:reqId").get(customerController.getRequest);


router.route("/:id").get(customerController.getCustomer);
router.route("/:id").put(customerController.updateCustomer);
router.route("/:id").delete(customerController.deleteCustomer);

module.exports = router;
