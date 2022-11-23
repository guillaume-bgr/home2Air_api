'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Park extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Park.hasOne(models.Company, {
        foreignKey: 'company_id',
      })
    }
  }
  Park.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Park',
  });
  return Park;
};