const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');
const technicianRoutes = require('./technicianRoutes');
const requestRoutes = require('./requestRoutes.js');
const sessionRoutes = require('./sessionRoutes');
const adminRoutes = require('./adminRoutes.js');
const healthRoutes = require('./healthRoutes');
const userRoutes = require('./userRoutes');

router.use('/customers', customerRoutes);

router.use('/users', userRoutes);

router.use('/technicians', technicianRoutes);

router.use('/health', healthRoutes);

router.use('/admin', adminRoutes);

router.use('/session', sessionRoutes);

router.use('/requests', requestRoutes);



module.exports = router;
