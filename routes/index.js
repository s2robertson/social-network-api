const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
router.use('/users', userRoutes);

const thoughtRoutes = require('./thoughts');
router.use('/thoughts', thoughtRoutes);

module.exports = router;