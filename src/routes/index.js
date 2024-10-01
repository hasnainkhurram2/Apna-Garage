const express = require("express");
const router = express.Router();
const customerRoutes = require("./customerRoutes");

const healthRoutes = require("./healthRoutes");

router.use("/customers", customerRoutes);

router.use("/health", healthRoutes);

module.exports = router;