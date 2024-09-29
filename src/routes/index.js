const express = require("express");
const router = express.Router();

//const loginRoutes = require("./loginRoutes");

//const userRoutes = require("./userRoutes");
//const userRoutesAdmin = require("./admin/userRoutes");

//const saleRoutes = require("./saleRoutes");
//const saleRoutesAdmin = require("./admin/saleRoutes");

//const reviewRoutes = require("./reviewRoutes");
//const reviewRoutesAdmin = require("./admin/reviewRoutes");

//const paymentRoutes = require("./paymentRoutes");
//const paymentRoutesAdmin = require("./admin/paymentRoutes");

//const orderRoutes = require("./orderRoutes");
//const orderRoutesAdmin = require("./admin/orderRoutes");

//const carRoutes = require("./carRoutes");
//const carRoutesAdmin = require("./admin/carRoutes");

const healthRoutes = require("./healthRoutes");

//router.use("/", loginRoutes);

//router.use("/users", userRoutes);
//router.use("/admin/users", userRoutesAdmin);

//router.use("/sales", saleRoutes);
//router.use("/admin/sales", saleRoutesAdmin);

//router.use("/reviews", reviewRoutes);
//router.use("/admin/reviews", reviewRoutesAdmin);

//router.use("/payments", paymentRoutes);
//router.use("/admin/payments", paymentRoutesAdmin);

//router.use("/orders", orderRoutes);
//router.use("/admin/orders", orderRoutesAdmin);

//router.use("/cars", carRoutes);
//router.use("/admin/cars", carRoutesAdmin);

router.use("/health", healthRoutes);

module.exports = router;
