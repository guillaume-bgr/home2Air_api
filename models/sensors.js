'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensors extends Model {
    static associate(models) {
      Sensors.hasOne(models.Parks, {
        as: 'Parks',
        foreignKey: 'id',
      })
    }
  }
  Sensors.init({
    name: DataTypes.STRING,
    companies_id: DataTypes.INTEGER,
    parks_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sensors',
  });
  return Sensors;
};