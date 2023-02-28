const sequelize = require('../config/connection');
const { User, Order } = require('../models');

const userData = require('./userData.json');
const orderData = require('./commentData.json');

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
  
    process.exit(0);
  };
  
  seedDatabase();
  