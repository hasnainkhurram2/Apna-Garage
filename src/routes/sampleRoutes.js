const express = require("express");
const CarController = require("./../controller/carController");

const router = express.Router();

router.route("/").get(CarController.getAllCars);

router.route("/:id").get(CarController.getCar);

router.route("/:id/reviews").get(CarController.getReviews);

module.exports = router;
