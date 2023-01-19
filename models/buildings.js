'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buildings extends Model {
    static associate(models) {
      Buildings.belongsToMany(models.Customers, {
        through: 'Customers-Buildings'
      })
    }
  }
  Buildings.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Buildings',
  });
  return Buildings;
};