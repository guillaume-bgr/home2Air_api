'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensors extends Model {
    static associate(models) {
      Sensors.belongsTo(models.Parks, {
        as: 'Parks',
        foreignKey: 'id',
      })
      Sensors.hasMany(models.SensorHistories, {
        as: 'SensorHistories',
        foreignKey: 'sensors_id',
      })
    }
  }
  Sensors.init({
    name: DataTypes.STRING,
    companies_id: DataTypes.INTEGER,
    parks_id: DataTypes.INTEGER,
    mac_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sensors',
  });
  return Sensors;
};