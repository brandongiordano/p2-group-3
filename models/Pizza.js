const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pizza extends Model {}

Pizza.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ingredients: {
        type: DataTypes.STRING,
    allowNull: false,
    get() {
        return this.getDataValue('favColors').split(';')
    },
    set(val) {
       this.setDataValue('favColors',val.join(';'));
    },
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'order',
          key: 'id',
        },
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pizza',
  }
);

module.exports = Pizza;