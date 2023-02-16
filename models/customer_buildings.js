'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer_Buildings extends Model {
    static associate(models) {
    }
  }
  Customer_Buildings.init({
    isOwner: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Customer_Buildings',
    tableName: 'customers_buildings'
  });
  return Customer_Buildings;
};