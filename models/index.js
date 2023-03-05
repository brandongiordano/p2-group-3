const User = require('./User');
const Order = require('./Order');
const Pizza = require('./Pizza');

Pizza.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Order,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'ordered_pizza'
});

User.belongsToMany(Pizza, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Order,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: 'order_history'
});




module.exports = { User, Order, Pizza };