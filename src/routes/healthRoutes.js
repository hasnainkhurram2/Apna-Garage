const express = require("express");
const healthController = require("./../controller/healthController");

const router = express.Router();

router.route("/").get(healthController.health_check);

module.exports = router;
