const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');

const adminRoutes = require('./adminRoutes.js');

const healthRoutes = require('./healthRoutes');

router.use('/customers', customerRoutes);

router.use('/health', healthRoutes);

router.use('/admin', adminRoutes);

module.exports = router;
