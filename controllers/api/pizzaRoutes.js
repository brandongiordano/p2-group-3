const router = require('express').Router();
const { Pizza } = require('../../models');

// CREATE a new pizza
router.post('/', async (req, res) => {
    try {
      const pizzaData = await Pizza.create(req.body);
      res.status(200).json(pizzaData);
    } catch (err) {
      res.status(400).json(err);
    }
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