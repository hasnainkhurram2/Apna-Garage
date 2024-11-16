const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');
const technicianRoutes = require('./technicianRoutes');
const sessionRoutes = require('./sessionRoutes');

const adminRoutes = require('./adminRoutes.js');

const healthRoutes = require('./healthRoutes');

router.use('/customers', customerRoutes);

router.use('/technicians', technicianRoutes);

router.use('/health', healthRoutes);

router.use('/admin', adminRoutes);

router.use('/session', sessionRoutes);

module.exports = router;
