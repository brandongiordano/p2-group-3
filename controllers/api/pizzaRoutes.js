const router = require('express').Router();
const { Pizza } = require('../../models/');

// CREATE a new pizza
router.post('/', async (req, res) => {
   try {
      const pizzaData = await Pizza.create(req.body);
      res.status(200).json(pizzaData);
    } catch (err) {
      res.status(400).json(err);
  }
});

// READ all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzaData = await Pizza.findAll();
    res.status(200).json(pizzaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ a single pizza by id
router.get('/:id', (req, res) => {
  // Find a single pizza by its primary key (id)
  Pizza.findByPk(req.params.id).then((pizzaData) => {
    res.json(pizzaData);
  });
});

// UPDATE a pizza by id
router.put('/:pizza_id', (req, res) => {
  //Calls the update method on the Pizza model
  Pizza.update(
    {
      // All the fields you can update and the data attached to the request body.
      pizza_name: req.body.pizza_name,
      price: req.body.price,
    },
    {
      // Gets a pizza based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPizza) => {
      res.json(updatedPizza);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// DELETE a pizza
router.delete('/:id', async (req, res) => {
  try {
      const pizzaData = await Pizza.destroy({
        where: { id: req.params.id }
      });
      if (!pizzaData) {
        res.status(404).json({ message: 'No pizza with this id!' });
        return;
      }
      res.status(200).json(pizzaData);
    } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;

  