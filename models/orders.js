'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Customers, {
        as: 'customers',
        foreignKey: 'id'
      })
    }
  }
  Orders.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    post_code: DataTypes.STRING,
    is_delivered: DataTypes.BOOLEAN,
    customers_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};