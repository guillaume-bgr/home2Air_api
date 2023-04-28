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
    oxydants: DataTypes.FLOAT,
    reducers: DataTypes.FLOAT,
    nh3: DataTypes.FLOAT,
    light: DataTypes.FLOAT,
    pressure: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    pm1: DataTypes.FLOAT,
    pm2_5: DataTypes.FLOAT,
    pm10: DataTypes.FLOAT,
    date: DataTypes.DATE,
    sensors_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SensorHistories',
  });
  return SensorHistories;
};