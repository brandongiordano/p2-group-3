const User = require('./User');
const Order = require('./Order');

User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Order };