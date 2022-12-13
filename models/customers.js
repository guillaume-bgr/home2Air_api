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
      Customers.hasMany(models.Tickets,{
        as: 'tickets',
        foreignKey: 'customers_id',
      })
      Customers.hasMany(models.Notifications,{
        as:"notifications",
        foreignKey:'customers_id',
      })
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
  }, {
    sequelize,
    modelName: 'Customers',
  });
  return Customers;
};