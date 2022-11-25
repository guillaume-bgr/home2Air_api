'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SensorHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SensorHistories.init({
    co: DataTypes.FLOAT,
    no2: DataTypes.FLOAT,
    nh3: DataTypes.FLOAT,
    date: DataTypes.DATE,
    sensors_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SensorHistories',
  });
  return SensorHistories;
};