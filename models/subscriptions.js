'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscriptions.hasMany(models.Customers,{
        as: 'customers',
        foreignKey: 'customers_id'
      })
    }
  }
  Subscriptions.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscriptions',
  });
  return Subscriptions;
};