'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, {
        foreignKey: 'customer_id',
        as: 'Customer'
      })
    }
  }
  Order.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    post_code: DataTypes.STRING,
    is_delivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Orders',
    freezeTableName: true,
  });
  return Order;
};