const express = require('express');
const router = express.Router();
const authRoutes = require('./auth/auth');
const userRoutes = require('./user/user');
const widgetRoutes = require('./widgets/widgets');

// Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/widgets', widgetRoutes);

module.exports = router;
