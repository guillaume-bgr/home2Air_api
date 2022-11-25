'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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