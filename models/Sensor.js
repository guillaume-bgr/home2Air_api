'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sensor.hasOne(models.Customer, {
        foreignKey: 'customer_id',
      })
      Sensor.hasOne(models.Park, {
        foreignKey: 'park_id',
      })
    }
  }
  Sensor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};