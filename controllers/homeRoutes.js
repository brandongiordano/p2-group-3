const router = require('express').Router();
const { Order, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('home', { 
      orders, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all orders
router.get('/order', async (req, res) => {
  try {
    const orderData = await Order.findAll({
      include: [{ model: Order }],
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//get all users
router.get('/user', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//get order by id
router.get('/order/:id', async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const order = orderData.get({ plain: true });

    res.render('order', {
      ...order,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Order }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;