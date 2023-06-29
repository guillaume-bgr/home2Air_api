'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parks.hasOne(models.Buildings, {
        as: 'Buildings',
        foreignKey: 'id',
      })
      Parks.hasMany(models.Sensors, {
        as: 'Sensors',
        foreignKey: 'parks_id',
      })
    }
  }
  Parks.init({
    name: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    building_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Parks',
  });
  return Parks;
};