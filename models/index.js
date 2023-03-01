const User = require('./User');
const Order = require('./Order');
const Pizza = require('./Pizza');


User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'user_id'
});

Order.hasMany(Pizza, {
  foreignKey: 'order_id',
  unique: false
});

module.exports = { User, Order, Pizza };