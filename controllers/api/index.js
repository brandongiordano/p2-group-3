const router = require('express').Router();
const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const pizzaRoutes = require('./pizzaRoutes');

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/pizzas', pizzaRoutes);

module.exports = router;