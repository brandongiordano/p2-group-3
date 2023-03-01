const sequelize = require('../config/connection');
const { User, Order, Pizza } = require('../models');

const userData = require('./blogData.json');
const orderData = require('./orderData.json');
const pizzaData = require('./pizzaData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const order of orderData) {
    await Order.create({
      ...order,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const pizzas = await Pizza.bulkCreate(pizzaData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
  