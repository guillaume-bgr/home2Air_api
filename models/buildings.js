'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buildings extends Model {
    static associate(models) {
      Buildings.belongsToMany(models.Customers, {
        through: 'Customer_Buildings'
      })
      Buildings.hasMany(models.Parks, {
        as: 'Parks',
        foreignKey: 'building_id',
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