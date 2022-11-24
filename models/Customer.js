'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toJSON() {
      return {
        ...this.get(), password: undefined
      }
    }
    static associate(models) {
      Customer.hasMany(models.Orders, {
        as: 'Orders',
        foreignKey: 'customer_id'
      })
      // Customer.hasOne(models.Role, {
      //   foreignKey: 'role_id',
      // })
      // Customer.hasOne(models.Company, {
      //   foreignKey: 'company_id'
      // })
    }
  }
  Customer.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};