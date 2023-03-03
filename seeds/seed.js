const sequelize = require('../config/connection');
const { User, Pizza } = require('../models');

const userData = require('./userData.json');
const pizzaData = require('./pizzaData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const pizza of pizzaData) {
    await Pizza.create({
      ...pizza,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
  