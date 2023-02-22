const router = require('express').Router();
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');

router.use('/users', userRoutes);
router.use('/projects', orderRoutes);

module.exports = router;