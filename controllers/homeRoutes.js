const router = require('express').Router();
const { Pizza, User, Order } = require('../models');
const withAuth = require('../utils/auth');
//Home route for user not logged in
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






// Route for home page for logged in user (not yet including associated table)
router.get('/home', withAuth, async (req, res) => {
  try {
    // Get all pizzas and JOIN with user data
    const userData = await User.findByPk(req.session.user_id,{attributes:{exclude:["password"]}}
      // include: [
      //   {
      //     model: Pizza,
      //     attributes: ['name'],
      //   },
      // ],
    );

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      ...user, 
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
      //include: [{ model: Pizza }],
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

router.get('/building', async (req, res) => {
  try {
    // Get all pizzas and JOIN with user data
    const pizzaData = await Pizza.findAll();

    // Serialize data so the template can read it
    const pizzas = pizzaData.map((pizza) => pizza.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('building', { 
      pizzas, 
      logged_in: req.session.logged_in 
    });
    console.log(pizzas)
  } catch (err) {
    res.status(500).json(err);
  }
});

//render /checkout (no associations yet)
router.get('/checkout', (req, res) => 
{

  res.render('checkout', {
    logged_in:true
  });
});

module.exports = router;