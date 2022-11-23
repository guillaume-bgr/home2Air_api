'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SensorHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SensorHistory.hasOne(models.Sensor, {
        foreignKey: 'sensor_id',
      })
    }
  }
  SensorHistory.init({
    co: DataTypes.FLOAT,
    no2: DataTypes.FLOAT,
    nh3: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SensorHistory',
  });
  return SensorHistory;
};