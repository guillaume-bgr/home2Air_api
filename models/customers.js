'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Customers.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    img: DataTypes.STRING,
    roles_id: DataTypes.INTEGER,
    companies_id: DataTypes.INTEGER,
    notifications: DataTypes.BOOLEAN,
    subscriptions_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};